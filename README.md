# Pitch

Pitch is a desktop-sized robotics drivetrain editor. Build gear trains, belt drives, and compound mechanisms on a shared XY canvas. Dimension shaft centers, mesh compatible gears, route belts through tensioners, and compare speed and direction between components in each independent train.

## Run locally

Use Node.js 22.12 or newer and npm.

~~~sh
npm ci
npm run dev
~~~

Run the logic suite with `npm test`. Run `npm run build` for the TypeScript check and optimized static site. Use `npm run preview` to inspect that build locally.

## Deploy on Vercel

Import this repository as a Vite project. Use the repository root, the build command `npm run build`, and output directory `dist`. No environment variables or backend are required.

## Using Pitch

- Place a pulley or gear from the toolbar. Drag compatible gears together until both pitch circles turn green, then release to mesh.
- Right-click an axle to add a component. Drag rows in the stack picker to change their physical order.
- Choose Create belt, select the pulleys, and press Enter. Select a belt to inspect its tooth count and members.
- Place a tensioner and drag it to a belt span. Right-click to adjust or detach it.
- Use More tools to dimension or align centers. In Drive ratio, choose the train, driver, and driven output.
- Refresh restores the current layout in the same browser. Code updates start a fresh session. Use Save file to keep a portable JSON copy.

Pitch models planar layout and ideal speed ratios. It does not model load capacity, backlash, or material strength.
