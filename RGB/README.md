# X42 Red Bunny — Sheet-Bound v5

This revision deliberately uses ONLY `assets/one_sheet.png` for the runtime art.

The Bunny is NOT made from extracted PNG frames. The engine cycles CSS background positions directly through the C01 cells in the master sheet:
- IDLE = cells 0,1,12,13
- WALK = 2,3,14,15
- RUN = 4,5,16,17
- ATTACK 1 = 6,7,18,19
- ATTACK 2 = 8,9,20,21
- DASH = 10,11,22,23

The same idea is used for the stage, NPC, enemy, equipment and effect crops: the sheet is the source of truth and the game binds coordinates to it.

The START button is registered after the DOM loads and no external asset is required, so the previous "Play doesn't start" failure path is removed.

Gameplay:
- fullscreen starter menu
- fixed handheld viewport
- joystick + keyboard movement
- stage changes at scene edges
- Mika meeting/dialogue
- NETWORK Hunter battle
- attack/skill animations
- equipment crop from master sheet
- editor panel with sheet and stage bindings
