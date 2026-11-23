# Pitch

Pitch is a robotics drivetrain layout tool for gears, belts, pulleys, and axles.

## Open the website

Visit [Pitch on GitHub Pages](https://rishinxp.github.io/pitch-web/).

## Download the desktop app

- [Windows x64](https://github.com/RishiNxp/pitch-desktop/releases/latest/download/Pitch-Windows-x64.zip). Extract the ZIP, open its **Pitch** folder, and run **Pitch.exe**.
- [macOS downloads](https://github.com/RishiNxp/pitch-mac/releases). Choose **arm64** for Apple Silicon or **x64** for Intel, extract the ZIP, and move **Pitch.app** to Applications.

The latest public Mac build is v1.0.0. It is ad hoc signed and not notarized, so it does not pass Apple's normal Gatekeeper checks. A signed, notarized release will be posted on the Mac releases page after Apple developer credentials are configured.

## Develop and publish website changes

Use Node.js 22.12 or newer and npm:

~~~sh
git clone https://github.com/RishiNxp/pitch-web.git
cd pitch-web
npm ci
npm test
npm run build
~~~

Push website changes to **main** to trigger the GitHub Pages deployment:

~~~sh
git add -A
git commit -m "Describe the website update"
git push origin main
~~~

You need write access to the repository to push to it. Otherwise, fork it, push your branch to your fork, and open a pull request.

The Vite output directory is **dist**. The site has no backend or required environment variables.
