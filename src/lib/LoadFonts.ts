const FONTS: { family: string; file: string; weight?: string; style?: string }[] = [
    { family: "Capetown", file: "CAPETOWN-OTF.otf" },
    { family: "Scaffold Heavy", file: "FONTSPRING-DEMO-SCAFFOLD-HEAVY.otf" },
    { family: "Scaffold", file: "FONTSPRING-DEMO-SCAFFOLD-LIGHT.otf", weight: "300" },
    { family: "Scaffold", file: "FONTSPRING-DEMO-SCAFFOLD-REGULAR.otf", weight: "400" },
    { family: "Scaffold", file: "FONTSPRING-DEMO-SCAFFOLD-BOLD.otf", weight: "700" },
    { family: "Scaffold", file: "FONTSPRING-DEMO-SCAFFOLD-HEAVY.otf", weight: "900" },

    { family: "Fair Prosper", file: "FAIR-PROSPER.ttf" },
    { family: "Deadjim", file: "DEADJIM.ttf" },
];

export function loadFonts() {
    FONTS.forEach(({ family, file, weight = "400", style = "normal" }) => {
        const url = `/fonts/${file}`;
        const face = new FontFace(family, `url("${url}")`, { weight, style, display: "swap" });

        face
            .load()
            .then((loaded) =>
                (document.fonts as unknown as { add(font: FontFace): void }).add(loaded)
            )
            .catch((err) =>
                console.error(
                    `[fonts] "${family}" failed to load from ${url}. ` +
                    `Open ${location.origin}${url} in the browser: 404 = wrong file name/path, ` +
                    `download works = the font file itself is invalid.`,
                    err
                )
            );
    });
}