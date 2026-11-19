#!/usr/bin/env python3
"""Mesh Contingency wallpaper generator.

    python3 generate.py LOCKUP_SVG OUT_SVG [WIDTH HEIGHT]

LOCKUP_SVG is public/branding/mesh-contingency-lockup-dark.svg. WIDTH x HEIGHT defaults
to 3840x1080. Screens 2:1 or wider get the wide layout (logo centred in the left half,
so it stays whole on the left of two monitors); narrower ones get the logo centred.
The node layout is fixed by the random seed below. Render with rsvg-convert.
"""
import math, random, re, sys

W, H = (int(sys.argv[3]), int(sys.argv[4])) if len(sys.argv) > 4 else (3840, 1080)
CENTER = W / H < 2
INK, INK2, ORANGE, SKY, TEXT = "#0D1117", "#151B23", "#FF5F1F", "#38BDF8", "#F2F5F8"
random.seed(7)

lockup_src = open(sys.argv[1]).read()
out_path = sys.argv[2]

# Lockup body without its background rect / svg wrapper.
inner = re.search(r"<svg[^>]*>(.*)</svg>", lockup_src, re.S).group(1)
inner = re.sub(r"<title>.*?</title>", "", inner)
inner = re.sub(r"<rect width=\"900\.4\"[^>]*/>", "", inner)

# Logo placement: centred in the left 1920 so it never straddles a dual-monitor seam.
LS = 1.12 if CENTER else 1.55
LW, LH = 900.4 * LS, 392 * LS
LX, LY = (W / 2 - LW / 2, H * 0.40 - LH / 2) if CENTER else (960 - LW / 2, H / 2 - LH / 2)
# Shield centre in wallpaper space (mark centre ~ (100,112) in mark space, scaled 1.2, offset 64).
SX, SY = LX + (64 + 100 * 1.2) * LS, LY + (64 + 112 * 1.2) * LS

def in_logo(x, y, pad=70):
    return LX - pad < x < LX + LW + pad and LY + 40 - pad < y < LY + LH - 40 + pad

# Poisson-disk-ish node scatter, denser to the right.
nodes = []
tries = 0
while len(nodes) < 260 and tries < 60000:
    tries += 1
    x, y = random.uniform(-40, W + 40), random.uniform(-40, H + 40)
    if in_logo(x, y):
        continue
    mind = (120 - 25 * (x / W)) if CENTER else (150 - 55 * (x / W))
    if all((x - a) ** 2 + (y - b) ** 2 > mind ** 2 for a, b in nodes):
        nodes.append((x, y))

def d(a, b):
    return math.hypot(a[0] - b[0], a[1] - b[1])

edges = set()
for i, a in enumerate(nodes):
    near = sorted(range(len(nodes)), key=lambda j: d(a, nodes[j]))[1:4]
    for j in near:
        if d(a, nodes[j]) < 260:
            edges.add(tuple(sorted((i, j))))

# Route: greedy walk from the node nearest the logo's right edge to the far right.
start = min(range(len(nodes)), key=lambda i: d(nodes[i], (90, H * 0.80) if CENTER else (LX + LW + 160, H / 2 + 40)))
route = [start]
adj = {i: set() for i in range(len(nodes))}
for i, j in edges:
    adj[i].add(j); adj[j].add(i)
cur = start
while nodes[cur][0] < W - (160 if CENTER else 260):
    cands = [j for j in adj[cur] if j not in route and nodes[j][0] > nodes[cur][0] + 40]
    if not cands:
        break
    # Prefer progress right, keep near the vertical middle band with a gentle wave.
    def score(j):
        x, y = nodes[j]
        target_y = (H * 0.80 + 60 * math.sin(x / 300)) if CENTER else (H / 2 + 170 * math.sin(x / 520))
        return -(x - nodes[cur][0]) + 0.9 * abs(y - target_y)
    cur = min(cands, key=score)
    route.append(cur)
route_edges = {tuple(sorted(p)) for p in zip(route, route[1:])}

svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">']
svg.append(f"""<defs>
<radialGradient id="glowO" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="{ORANGE}" stop-opacity="0.22"/><stop offset="1" stop-color="{ORANGE}" stop-opacity="0"/></radialGradient>
<radialGradient id="glowS" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="{SKY}" stop-opacity="0.13"/><stop offset="1" stop-color="{SKY}" stop-opacity="0"/></radialGradient>
<radialGradient id="node" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="{SKY}" stop-opacity="0.55"/><stop offset="1" stop-color="{SKY}" stop-opacity="0"/></radialGradient>
<radialGradient id="hot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="{ORANGE}" stop-opacity="0.7"/><stop offset="1" stop-color="{ORANGE}" stop-opacity="0"/></radialGradient>
<linearGradient id="vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{INK}" stop-opacity="0.85"/><stop offset="0.22" stop-color="{INK}" stop-opacity="0"/><stop offset="0.78" stop-color="{INK}" stop-opacity="0"/><stop offset="1" stop-color="{INK}" stop-opacity="0.9"/></linearGradient>
<linearGradient id="fadeL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{INK}" stop-opacity="0.7"/><stop offset="0.08" stop-color="{INK}" stop-opacity="0"/><stop offset="0.94" stop-color="{INK}" stop-opacity="0"/><stop offset="1" stop-color="{INK}" stop-opacity="0.7"/></linearGradient>
<radialGradient id="plate" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="{INK}" stop-opacity="0.9"/><stop offset="0.55" stop-color="{INK}" stop-opacity="0.6"/><stop offset="1" stop-color="{INK}" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><circle cx="24" cy="24" r="1.3" fill="{TEXT}" fill-opacity="0.07"/></pattern>
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="blurBig" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
</defs>""")

svg.append(f'<rect width="{W}" height="{H}" fill="{INK}"/>')
svg.append(f'<rect width="{W}" height="{H}" fill="url(#grid)"/>')
# Ambient light.
svg.append(f'<ellipse cx="{SX}" cy="{SY}" rx="{620 if CENTER else 900}" ry="{480 if CENTER else 700}" fill="url(#glowO)" opacity="{0.55 if CENTER else 1}"/>')
svg.append(f'<ellipse cx="{W * 0.755:.0f}" cy="380" rx="{W * 0.34:.0f}" ry="800" fill="url(#glowS)"/>')
svg.append(f'<ellipse cx="{W * 0.94:.0f}" cy="900" rx="700" ry="500" fill="url(#glowO)" opacity="0.6"/>')

# Broadcast rings from the shield — the mark's arcs, writ large.
for k, r in enumerate(range(260, 2400, 115)):
    op = max(0.0, 0.16 * (1 - k / 19))
    svg.append(f'<circle cx="{SX:.1f}" cy="{SY:.1f}" r="{r}" fill="none" stroke="{ORANGE}" stroke-width="{2 if k % 3 else 3}" stroke-opacity="{op:.3f}"/>')

# Mesh links.
svg.append('<g stroke-linecap="round">')
for i, j in edges:
    if (i, j) in route_edges:
        continue
    a, b = nodes[i], nodes[j]
    op = 0.10 + 0.12 * ((a[0] + b[0]) / 2 / W)
    svg.append(f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{b[0]:.1f}" y2="{b[1]:.1f}" stroke="{SKY}" stroke-opacity="{op:.3f}" stroke-width="1.6"/>')
svg.append("</g>")

# The route: glow underlay + crisp orange path + a dashed lead-in from the shield.
pts = " ".join(f"{nodes[i][0]:.1f},{nodes[i][1]:.1f}" for i in route)
lead = f"{SX + 150:.1f},{SY:.1f} {nodes[route[0]][0]:.1f},{nodes[route[0]][1]:.1f}"
svg.append(f'<polyline points="{pts}" fill="none" stroke="{ORANGE}" stroke-width="14" stroke-opacity="{0.25 if CENTER else 0.45}" filter="url(#blurBig)" stroke-linejoin="round"/>')
svg.append(f'<polyline points="{pts}" fill="none" stroke="{ORANGE}" stroke-width="3.5" stroke-opacity="0.95" stroke-linejoin="round" stroke-linecap="round"/>')
if not CENTER: svg.append(f'<polyline points="{lead}" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-opacity="0.55" stroke-dasharray="2 14" stroke-linecap="round"/>')

# Nodes.
route_set = set(route)
for i, (x, y) in enumerate(nodes):
    if i in route_set:
        continue
    big = random.random() < 0.14
    r = 6.5 if big else random.choice((3.2, 3.8, 4.5))
    op = 0.55 + 0.4 * (x / W)
    if big:
        svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r * 5:.1f}" fill="url(#node)"/>')
        svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r + 7:.1f}" fill="none" stroke="{SKY}" stroke-opacity="0.25" stroke-width="1.5"/>')
    svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{SKY}" fill-opacity="{min(op, 1):.2f}"/>')

# Route hops: white-ringed relays, orange core, little radio arcs above (from the mark).
def arcs(x, y, s=1.0):
    out = []
    for rad, op in ((14, 0.9), (22, 0.6), (30, 0.35)):
        rr = rad * s
        a0, a1 = math.radians(-135), math.radians(-45)
        x0, y0 = x + rr * math.cos(a0), y - 6 + rr * math.sin(a0)
        x1, y1 = x + rr * math.cos(a1), y - 6 + rr * math.sin(a1)
        out.append(f'<path d="M{x0:.1f} {y0:.1f} A{rr:.1f} {rr:.1f} 0 0 1 {x1:.1f} {y1:.1f}" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-linecap="round" stroke-opacity="{op}"/>')
    return out

for n, i in enumerate(route):
    x, y = nodes[i]
    svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{30 if CENTER else 44}" fill="url(#hot)" opacity="{0.6 if CENTER else 1}"/>')
    svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="11" fill="{INK2}" stroke="{TEXT}" stroke-width="3"/>')
    svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5.5" fill="{ORANGE}"/>')
    if n % 3 == 1 or n == len(route) - 1:
        svg += arcs(x, y - 14, 1.0)

# Destination: concentric ping.
ex, ey = nodes[route[-1]]
for r, op in ((34, 0.55), (58, 0.32), (86, 0.16)):
    svg.append(f'<circle cx="{ex:.1f}" cy="{ey:.1f}" r="{r}" fill="none" stroke="{ORANGE}" stroke-width="2.5" stroke-opacity="{op}"/>')

# Edge vignettes.
svg.append(f'<rect width="{W}" height="{H}" fill="url(#vig)"/>')
svg.append(f'<rect width="{W}" height="{H}" fill="url(#fadeL)"/>')

# Logo plate: soft dark halo so the mesh never fights the wordmark.
svg.append(f'<ellipse cx="{LX + LW / 2:.1f}" cy="{LY + LH / 2:.1f}" rx="{LW * 0.78:.1f}" ry="{LH * 0.75:.1f}" fill="url(#plate)"/>')
svg.append(f'<g transform="translate({LX:.1f},{LY:.1f}) scale({LS})">{inner}</g>')

svg.append("</svg>")
open(out_path, "w").write("\n".join(svg))
print(f"{len(nodes)} nodes, {len(edges)} links, route {len(route)} hops")
