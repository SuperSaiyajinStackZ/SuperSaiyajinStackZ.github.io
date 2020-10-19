---
title: LeafEdit-Pattern-Editor
description: LeafEdit's Pattern Editor.
permalink: /projects/leafedit-pattern-editor
---

# LeafEdit Pattern Editor

![](/assets/images/icons/leafedit-pattern-editor.png) ![](/assets/images/lpe/banner.png)

This is LeafEdit's Pattern Editor as a separate app as well!

### NOTE: This tool can _only_ edit and store pattern. For a more featured Save Editor please use [LeafEdit](https://github.com/Universal-Team/LeafEdit) instead.


## Current Features

- Open `.acnl` and `.acww` files.

- Automatically detection of Pattern format.

- Have pre-included pattern for AC:NL & AC:WW.

- Creation of empty pattern.

- Edit Palettes through the Palette Menu.

- Edit Pattern.

- Export pattern to `.acnl` or `.acww` format, depending on the Pattern format.

- Include a font, which should be able to display all characters.

- A Pattern Tool Overlay.

- Ability, to load a default pattern on each startup from the SD Card through the `Settings.json` file.

- Ability to load Pattern "default" information, such as Pattern Name, Creator Name, Town Name, Creator ID, Town ID & Creator Gender.

- Added a proper banner & icon.

- German & English support.

- Export Pattern Informations. // For the defaults.

- Edit Pattern from AC:WW, AC:NL, AC:WA & AC:HHD's savefile directly.

- A Storage System for your favorite AC:WW, AC:NL, AC:WA & AC:HHD's Pattern.

- A Storage Menu for changing, resizing, creating, saving and managing the storage.

- Music Playback support. (It supports .WAV and it MUST be MONO and smaller than 13 MB and it must be called `Music.wav` and inside `sdmc:/3ds/LeafEdit/Pattern-Editor/`).


## Planned | TODOs
- 16-bit BMP images to Pattern conversion.

- Add "Draw Modes".. for example: Line Mode, Normal Mode etc.

## Screenshots of LeafEdit-Pattern-Editor
### Credits
![](/assets/images/lpe/splash.png) ![](/assets/images/lpe/credits.png)

### MainScreen
![](/assets/images/lpe/main.png)

### Palette Editor
![](/assets/images/lpe/paletteEditor.png) ![](/assets/images/lpe/colorGroup.png)

### Import and Export
![](/assets/images/lpe/export.png) ![](/assets/images/lpe/import.png) ![](/assets/images/lpe/prompt.png)

### Pattern Tool
![](/assets/images/lpe/toolMenu.png)

### Selections
![](/assets/images/lpe/gameSelect.png) ![](/assets/images/lpe/regionSelect.png) ![](/assets/images/lpe/langSelect.png)

### ShareOverlay
![](/assets/images/lpe/shareOvl.png)

### Storage
![](/assets/images/lpe/storageMenu.png) ![](/assets/images/lpe/storageMain.png) ![](/assets/images/lpe/storageInfo.png)


## Compilation:
You need devkitARM along with Libctru, Citro2D & Citro3D for this to compile. You will also need Universal-Core, which should be included, when you git clone this repository properly. You also need bannertool and Makerom inside this folder and then run make. Then you should have a `LeafEdit-Pattern-Editor.3dsx` and a `LeafEdit-Pattern-Editor.cia` executable.

## Download
You can get LeafEdit Pattern Editor from [here](https://github.com/SuperSaiyajinStackZ/LeafEdit-Pattern-Editor/releases).

## CIA installation [CFW Needed]
1.) Download `LeafEdit-Pattern-Editor.cia` from the Release page.

2.) Put `LeafEdit-Pattern-Editor.cia` to your SD Card.

3.) Start FBI and install the CIA file. You should know, how to install it.

4.) Just start the app from your Home Menu and done!

## 3DSX installation [CFW Needed]
1.) Download `LeafEdit-Pattern-Editor.3dsx` from the Release page.

2.) Put `LeafEdit-Pattern-Editor.3dsx` to the `sdmc:/3ds/` folder.

3.) Start up the Homebrew Launcher and select the LeafEdit-Pattern-Editor app. Done!

## Credits
### Main Developer
- [SuperSaiyajinStackZ](https://github.com/SuperSaiyajinStackZ): For creating this app.

### Translators
- [SuperSaiyajinStackZ](https://github.com/SuperSaiyajinStackZ): German & English.

### Other
- [devkitPro](https://github.com/devkitPro), [Fincs](https://github.com/fincs), [Smealum](https://github.com/smealum), [Wintermute](https://github.com/WinterMute): For devkitARM, Citro2D, Citro3D and Libctru.

- [LeafEdit-Core-Contributors](https://github.com/Universal-Team/LeafEdit): For helping on LeafEdit-Core.

- [PKSM](https://github.com/FlagBrew/PKSM): For the base of the storage / Bank system, which i used, but now reworked for the Pattern system.

- [Slattz](https://github.com/Slattz): For the region flags & game icons from [NLTK](https://github.com/Slattz/NLTK).

- [Universal-Team](https://github.com/Universal-Team): For [LeafEdit's](https://github.com/Universal-Team/LeafEdit) core and [Universal-Core](https://github.com/Universal-Team/Universal-Core).

- [TotallyNotGuy](https://github.com/TotallyNotGuy): For the amazing Graphics from LeafEdit.