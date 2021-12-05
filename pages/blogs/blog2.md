---
layout: bloglyt
title: TSGBAStringFetcher
description: Blog 2 - TSGBAStringFetcher
permalink: /blogs/blog2
---

**Welcome to my second blog about [TSGBAStringFetcher](https://github.com/SuperSaiyajinStackZ/S2TestStuff/tree/main/Tools/ROM/TSGBAStringFetcher).**

A short explanation of this tool:
> **"extract" in-game strings from The Sims Game Boy Advance games.**

In this blog, i will explain how that tool works, as i think it might fit better in an actual blog than on a README.md honestly lol.

I will try to explain it as good as i can, so that you can actually get the Strings without the need of this program. Though honestly if you can use the program, just use it, as doing it manually will only cost much time and can possibly cause annoyance depending on how long the string is.
<hr>

## What you will need
***You definitely need:***

- Basic knowledge about [Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal).
- A Hex Editor ([HxD](https://mh-nexus.de/de/hxd/) works pretty well for it) or a way to view the bytes of the Game.
- A Calculator (On Windows 10, it's pre-included calculator in programming mode is ***Perfect*** for it, as it has a `>>` (right shift) operation *and* `%`, so everything there you need).
- Your dumped backup of the game of course.
- Something to store notes, because trust me, without you will definitely get lost with all the things you need to have in mind.

If you got all of that, then you can continue with the next step.
<hr>

## Preparations
Before we start with it, we need to make some notes:

- From which game do we want to fetch a string? See [Locations](blog2#locations) below for more.
- Which String ID do we want to fetch? See [ID Ranges](blog2#id-ranges) below for the min and max values from which you can fetch a string from.
- In which language do we want to fetch the String from? See [Locations](blog2#locations) as well, as the things for it are related to it.

In this example I will choose:

- Game: `The Sims 2 Game Boy Advance`
- StringID: `379` (Which is Burple, I already checked before).
- Language: English

So with that, the notes would look like the following for example:

- Locations:
    - Address1: `019B4990`
    - Address2: `019B4B20`
    - Address3: `019B4994`

- StringID: `379`
<hr>

## Locations
You will find the Locations for all supported games below.

***The Sims 2 Game Boy Advance***

| Language | Address1 | Address2 | Address3 |
| -------- | -------- | -------- | -------- |
| English  | 019B4990 | 019B4B20 | 019B4994 |
| Dutch    | 019D7784 | 019D7924 | 019D7788 |
| French   | 019FAF9C | 019FB154 | 019FAFA0 |
| German   | 01A1F7E0 | 01A1F98C | 01A1F7E4 |
| Italian  | 01A460A0 | 01A46254 | 01A460A4 |
| Spanish  | 01A697C0 | 01A69978 | 01A697C4 |

***The Urbz - Sims in the City Game Boy Advance (non japanese)***

| Language | Address1 | Address2 | Address3 |
| -------- | -------- | -------- | -------- |
| English  | E4F820   | E4F9B0   | E4F824   |
| Dutch    | E93ECC   | E94074   | E93ED0   |
| French   | EDA9AC   | EDAB60   | EDA9B0   |
| German   | F26B40   | F26CD8   | F26B44   |
| Italian  | F733B4   | F73560   | F733B8   |
| Spanish  | FBA2AC   | FBA460   | FBA2B0   |

***The Sims Bustin' Out Game Boy Advance (non japanese)***

| Language | Address1 | Address2 | Address3 |
| -------- | -------- | -------- | -------- |
| English  | 98D488   | 98D5FC   | 98D48C   |
| Dutch    | 9C1A7C   | 9C1C00   | 9C1A80   |
| French   | 9F5294   | 9F5438   | 9F5298   |
| German   | A2FE48   | A2FFD4   | A2FE4C   |
| Italian  | A5ECF0   | A5EE7C   | A5ECF4   |
| Spanish  | A94E60   | A9500C   | A94E64   |

<hr>

## ID Ranges
You can find the proper min and max values of the String IDs in the table below.

| Game                        | Min | Max    |
| --------------------------- | --- | ------ |
| The Sims Bustin' Out        | 0x0 | 0x1A02 |
| The Urbz - Sims in the City | 0x0 | 0x1AFD |
| The Sims 2                  | 0x0 | 0xD85  |

<hr>

## After initial preparations
Now that we know the Addresses, the String ID and the language, we can focus on some of the variables.

- `Counter`: We need this variable for the right shift and `ShiftVal` + `ShiftAddress` variables.
- `Character`: This will contain two bytes (while we will need one), which we will decode later on after getting all of the character bytes.
- `ShiftVal`: We need this for the right shift operation.
- `ShiftAddress`: We need this to get the `ShiftVal`.

Now we can also set initial values to `Counter` and `Character`. `Counter` should have an initial value of `0`, and `Character` an initial value of `0x100`.

For `ShiftVal` and `ShiftAddress`, we will focus on that below, as the initial value depend on the StringID and the Addresses.
<hr>

## Getting the ShiftAddress
Now to get the `ShiftAddress` we'll have to do the following actions:

- `StringID` * `0x4` (which would be `0x379` * `0x4` => `0xDE4`).
- `Address2` + `Result from above` (Which would be `0x019B4B20` + `0xDE4` => `0x19B5904`).

Now we have to open the Hex Editor (I use [HxD](https://mh-nexus.de/de/hxd/) in my case) and go to the location of the last result (in my case `19B5904`).

We will have to read 4 bytes starting at that location.

![](/assets/images/blogs/blog2/1.png)

As you can see on the picture, the section I marked `B7 EC 00 00` is what we got there. We will have to swap the byte order though, so `B7 EC 00 00` gets `00 00 EC B7` which would be the value: `0xECB7` or `0x0000ECB7`.

Now to get the final initial `ShiftAddress`, what we have to do now is:

- `Address1` + `Read Value From Above` (which would be `0x019B4990` + `0xECB7` => `0x19C3647`).
<hr>

## Getting the ShiftVal
Now that we know the initial `ShiftAddress`, this part is easy.

Basically we'll have to read 4 byte starting at the `ShiftAddress` location.

In this case we'll go to `19C3647`, which results in `E1 EC 20 E3`, now we'll swap that again, so `E1 EC 20 E3` => `E3 20 EC E1` which would be `0xE320ECE1`.
<hr>

## The actual start
Now let's get the notes again of what we initialized:

- Locations:
    - Address1: `019B4990`
    - Address2: `019B4B20`
    - Address3: `019B4994`

- Counter: `0x0`
- Character: `0x100`
- ShiftVal: `0xE320ECE1`
- ShiftAddress: `0x19C3647`

We don't need the StringID anymore, as we only needed it for the initial `ShiftVal` / `ShiftAddress`, so the variables above are the only ones we have to keep in mind.

Below you can find a "semi" code snippet of how the actions will be handled.
```cpp
do {
	Character = 0x100;

	do {
		const bool IsZero = ((ShiftVal >> Counter) % 0x2) == 0;

		if (IsZero == true) {
			Character = Read2BytesFromROMData((Character * 0x4) + Address3 - 0x400);

		} else if (IsZero == false) {
			Character = Read2BytesFromROMData((Character * 0x4) + Address3 - 0x3FE);
		}

		Counter = Counter + 1;

		if (Counter == 8) {
			Counter = 0;
			ShiftAddress = ShiftAddress + 1;
			ShiftVal = Read4BytesFromROMData(ShiftAddress);
		}
	} while (0xFF < Character);

	StringList.push_back(Character);
} while (Character != 0x0);
```

Basically what it's first doing is, set `Character` to `0x100`. We already did it before.

Then we are doing a loop with the actions of it explained below until `0xFF` is smaller as `Character`.
<hr>

## Shifting Action
This is, what we'll first do at the start of the loop:

```cpp
const bool IsZero = ((ShiftVal >> Counter) % 0x2) == 0;
```

Basically, in our calculator, we will do:
> `ShiftVal` >> `Counter` % 0x2

Which would be in the first loop:
> `0xE320ECE1` >> `0` % 0x2

And the result of that would be:
> `0xE320ECE1` >> `0` (`0xE320ECE1`) % 0x2 => `1`.

Because this is NOT zero, the result would be ***false***.

But because `Counter` being `0` would be lame, let's do it as `Counter` being `4`.
> `0xE320ECE1` >> `4` (`0xE320ECE`) % 0x2 => `0`.

So in the case of `Counter` being `4`, we'll get the result `0`.. which in the case of `Is Zero` would be ***true***.

***If you don't have an option for right shift, then the following way will work as well.***

> `ShiftVal` / `See Table for Counter Value below` % 0x2

So here we will have to take a look at the table below.

| Counter | Value |
| ------- | ----- |
| 0       | 0x0   |
| 1       | 0x2   |
| 2       | 0x4   |
| 3       | 0x8   |
| 4       | 0x10  |
| 5       | 0x20  |
| 6       | 0x40  |
| 7       | 0x80  |

Because `Counter` for that action ***never*** reaches `8`, we will be fine with `0 - 7`.

Let's do the same example as above with `Counter` being `0` and then `4`.

> `0xE320ECE1` / `0x0` (`0xE320ECE1`) % 0x2 => `1`.

> `0xE320ECE1` / `0x10` (`0xE320ECE`) % 0x2 => `0`.

See? You basically get the same result doing that way. As for `%` if you really have no choice, then you can just use Google, as if i remember correctly it also has a calculator. Basically the `%` operator means, how much is left if you would do `/` instead, example: `9 / 2` would be `4`, but `1` is left. If that would be `8 / 2`, then that would be `4` and obviously `0` is left, as you can divide 8 by 2 completely.

You can find a "visual" way below.

![](/assets/images/blogs/blog2/2.png)

<hr>

## Character Read Action
After we did the [Shifting Action](blog2#shifting-action), we can continue here.

```cpp
if (IsZero == true) {
	Character = Read2BytesFromROMData((Character * 0x4) + Address3 - 0x400);

} else if (IsZero == false) {
	Character = Read2BytesFromROMData((Character * 0x4) + Address3 - 0x3FE);
}
```

`IsZero` is basically the result from the [Shifting Action](blog2#shifting-action). Let's go onto this action here step by step.
> `Character` * `0x4`

Initially this would be:
> `0x100` * `0x4` => `0x400`.

So far so good for the first one from that list. Let's continue on.

> `Result from Above` + `Address3`

In this case it'd be:
> `0x400` + `0x019B4994` => `0x19B4D94`.

So far so good too, right? Let's get into the next one.
> `Result from Above` - `If Shifting Action was True (IsZero) then 0x400, else 0x3FE`

Soo, because the result with `IsZero` at `Counter` being `0` was 1 (which is not Zero), it'd be:
> `0x19B4D94` - `0x3FE` => `0x19B4996`

***Now from the result from above, we'll read 2 bytes through the Hex Editor again.***

So like before, go to the result from above (in this case `19B4996`) and read the bytes starting from that.

In this case i got `62 01` (like before, we have to swap it again, so `62 01` => `01 62` which would be `0x0162`).

This will be our new `Character` value.
<hr>

## Increasing Counter and Action
After we got the new `Character` value, it's time we'll increase our `Counter` variable by 1.

If the `Counter` variable reached `8`, we have to do the following Actions:

- Reset `Counter` back to `0`.
- Increase `ShiftAddress` by `1`.
- Re-read `ShiftVal` from the new `ShiftAddress`.

In case you forgot how to do the last step, here explained again.

Go to the location of `ShiftAddress` in the Hex Editor, then read the 4 bytes again. Like before you will have to swap the byte order again, so: `11 22 33 44` => `44 33 22 11` which would be the new value: `0x44332211` (This is only an example).
<hr>

## Check Action
Now repeat the steps from [Shifting Action](blog2#shifting-action) until this as long as `0xFF` is smaller than the `Character` variable. If `Character` is `0xFF` or smaller, then you can do the following Action below.

- Make a note of the current `Character` value somewhere, so you won't forget it or everything was for nothing.
    - You should make the note of that like an array, so it'd look like: `0x20, 0x55, 0x77...`, because we will have to decode that at the end to a read-able string.

- If the `Character` has a value of `0x0`, then you are done for this action and can keep going with [Decoding Action](blog2#decoding-action) which is the last thing. Else follow the step below.

- Set `Character` back to `0x100` and repeat [Shifting Action](blog2#shifting-action) until this.
<hr>

## Decoding Action
First of all, there are characters that are invalid, those are the following:

- 0x1 - 0x9
- 0xB - 0x1F
- 0xBC - 0xFF

You can just skip them at this process.

Below you will find the table of the characters and their value.

Basically what you have to do is, search for the `Value` in the table from your result of above, then note the `Character`.

After you did it for each value you read from the previous steps, you got your string in a read-able format!

| Value | Character |
| ----- | --------- |
| 0x0   | `\0`      |
| 0xA   | `\n`      |
| 0x20  | `(space)` |
| 0x21  | `!`       |
| 0x22  | `"`       |
| 0x23  | `#`       |
| 0x24  | `$`       |
| 0x25  | `%`       |
| 0x26  | `&`       |
| 0x27  | `'`       |
| 0x28  | `(`       |
| 0x29  | `)`       |
| 0x2A  | `*`       |
| 0x2B  | `+`       |
| 0x2C  | `,`       |
| 0x2D  | `-`       |
| 0x2E  | `.`       |
| 0x2F  | `/`       |
| 0x30  | `0`       |
| 0x31  | `1`       |
| 0x32  | `2`       |
| 0x33  | `3`       |
| 0x34  | `4`       |
| 0x35  | `5`       |
| 0x36  | `6`       |
| 0x37  | `7`       |
| 0x38  | `8`       |
| 0x39  | `9`       |
| 0x3A  | `:`       |
| 0x3B  | `;`       |
| 0x3C  | `<`       |
| 0x3D  | `=`       |
| 0x3E  | `>`       |
| 0x3F  | `?`       |
| 0x40  | `@`       |
| 0x41  | `A`       |
| 0x42  | `B`       |
| 0x43  | `C`       |
| 0x44  | `D`       |
| 0x45  | `E`       |
| 0x46  | `F`       |
| 0x47  | `G`       |
| 0x48  | `H`       |
| 0x49  | `I`       |
| 0x4A  | `J`       |
| 0x4B  | `K`       |
| 0x4C  | `L`       |
| 0x4D  | `M`       |
| 0x4E  | `N`       |
| 0x4F  | `O`       |
| 0x50  | `P`       |
| 0x51  | `Q`       |
| 0x52  | `R`       |
| 0x53  | `S`       |
| 0x54  | `T`       |
| 0x55  | `U`       |
| 0x56  | `V`       |
| 0x57  | `W`       |
| 0x58  | `X`       |
| 0x59  | `Y`       |
| 0x5A  | `Z`       |
| 0x5B  | `[`       |
| 0x5C  | `\`       |
| 0x5D  | `]`       |
| 0x5E  | `^`       |
| 0x5F  | `_`       |
| 0x60  | `` ` ``   |
| 0x61  | `a`       |
| 0x62  | `b`       |
| 0x63  | `c`       |
| 0x64  | `d`       |
| 0x65  | `e`       |
| 0x66  | `f`       |
| 0x67  | `g`       |
| 0x68  | `h`       |
| 0x69  | `i`       |
| 0x6A  | `j`       |
| 0x6B  | `k`       |
| 0x6C  | `l`       |
| 0x6D  | `m`       |
| 0x6E  | `n`       |
| 0x6F  | `o`       |
| 0x70  | `p`       |
| 0x71  | `q`       |
| 0x72  | `r`       |
| 0x73  | `s`       |
| 0x74  | `t`       |
| 0x75  | `u`       |
| 0x76  | `v`       |
| 0x77  | `w`       |
| 0x78  | `x`       |
| 0x79  | `y`       |
| 0x7A  | `z`       |
| 0x7B  | `©`       |
| 0x7C  | `œ`       |
| 0x7D  | `¡`       |
| 0x7E  | `¿`       |
| 0x7F  | `À`       |
| 0x80  | `Á`       |
| 0x81  | `Â`       |
| 0x82  | `Ã`       |
| 0x83  | `Ä`       |
| 0x84  | `Å`       |
| 0x85  | `Æ`       |
| 0x86  | `Ç`       |
| 0x87  | `È`       |
| 0x88  | `É`       |
| 0x89  | `Ê`       |
| 0x8A  | `Ë`       |
| 0x8B  | `Ì`       |
| 0x8C  | `Í`       |
| 0x8D  | `Î`       |
| 0x8E  | `Ï`       |
| 0x8F  | `Ñ`       |
| 0x90  | `Ò`       |
| 0x91  | `Ó`       |
| 0x92  | `Ô`       |
| 0x93  | `Õ`       |
| 0x94  | `Ö`       |
| 0x95  | `Ø`       |
| 0x96  | `Ù`       |
| 0x97  | `Ú`       |
| 0x98  | `Ü`       |
| 0x99  | `ß`       |
| 0x9A  | `à`       |
| 0x9B  | `á`       |
| 0x9C  | `â`       |
| 0x9D  | `ã`       |
| 0x9E  | `ä`       |
| 0x9F  | `å`       |
| 0xA0  | `æ`       |
| 0xA1  | `ç`       |
| 0xA2  | `è`       |
| 0xA3  | `é`       |
| 0xA4  | `ê`       |
| 0xA5  | `ë`       |
| 0xA6  | `ì`       |
| 0xA7  | `í`       |
| 0xA8  | `î`       |
| 0xA9  | `ï`       |
| 0xAA  | `ñ`       |
| 0xAB  | `ò`       |
| 0xAC  | `ó`       |
| 0xAD  | `ô`       |
| 0xAE  | `õ`       |
| 0xAF  | `ö`       |
| 0xB0  | `ø`       |
| 0xB1  | `ù`       |
| 0xB2  | `ú`       |
| 0xB3  | `û`       |
| 0xB4  | `ü`       |
| 0xB5  | `º`       |
| 0xB6  | `ª`       |
| 0xB7  | `…`       |
| 0xB8  | `™`       |
| 0xB9  |           |
| 0xBA  | `®`       |
| 0xBB  |           |

<hr>

## Test attempt
You can see how i reproduced it step by step on my own.

***NOTE: This might be large.***

```
PREPARATIONS
Locations:
    - Address1 => 019B4990
    - Address2 => 019B4B20
    - Address3 => 019B4994
- StringID: 379


INITIAL SHIFT ADDRESS
379 * 4 => DE4
019B4B20 + DE4 => 19B5904
^ReadVal => B7 EC 00 00 => ECB7
ShiftAddress => 019B4990 + ECB7 => 19C3647


INITIAL SHIFT VAL
ShiftVal => E1 EC 20 E3 => E320ECE1


NOTES
Counter => 0
Character => 100
ShiftVal => E320ECE1
ShiftAddress => 19C3647
Res => 42, 75, 72, 70, 6C, 65, 00
FINAL => B, u, r, p, l, e, \0


LOOP 1
E320ECE1 >> 0 (E320ECE1) % 2 => 1
100 * 4 (400) + 019B4994 (19B4D94) - 3FE => 19B4996
Character => 62 01 => 162
Counter => 1

E320ECE1 >> 1 (71907670) % 2 => 0
162 * 4 (588) + 019B4994 (19B4F1C) - 400 => 19B4B1C
Character => 5F 01 => 15F
Counter => 2

E320ECE1 >> 2 (38C83B38) % 2 => 0
15F * 4 (57C) + 019B4994 (19B4F10) - 400 => 19B4B10
Character => 5A 01 => 15A
Counter => 3

E320ECE1 >> 3  (1C641D9C) % 2 => 0
15A * 4 (568) + 019B4994 (19B4EFC) - 400 => 19B4AFC
Character => 52 01 => 152
Counter => 4

E320ECE1 >> 4  (E320ECE) % 2 => 0
152 * 4 (548) + 019B4994 (19B4EDC) - 400 => 19B4ADC
Character => 4A 01 => 14A
Counter => 5

E320ECE1 >> 5  (7190767) % 2 => 1
14A * 4 (528) + 019B4994 (19B4EBC) - 3FE => 19B4ABE
Character => 42 01 => 142
Counter => 6

E320ECE1 >> 6  (38C83B3) % 2 => 1
142 * 4 (508) + 019B4994 (19B4E9C) - 3FE => 19B4A9E
Character => 39 01 => 139
Counter => 7

E320ECE1 >> 7  (1C641D9) % 2 => 1
139 * 4 (4E4) + 019B4994 (19B4E78) - 3FE => 19B4A7A
Character => 2B 01 => 12B
Counter => 8

COUNTER RESET
Counter => 0
ShiftAddress => 19C3648
ShiftVal => EC 20 E3 06 ==> 06E320EC

06E320EC >> 0 (06E320EC ) % 2 => 0
12B * 4 (4AC) + 019B4994 (19B4E40) - 400 => 19B4A40
Character => 42 00 => 42
Counter => 1


LOOP 2
Character => 100

06E320EC >> 1 (3719076) % 2 => 0
100 * 4 (400) + 019B4994 (19B4D94) - 400 => 19B4994
Character => 61 01 => 161
Counter => 2

06E320EC >> 2 (1B8C83B) % 2 => 1
161 * 4 (584) + 019B4994 (19B4F18) - 3FE => 19B4B1A
Character => 5E 01 => 15E
Counter => 3

06E320EC >> 3 (DC641D) % 2 => 1
15E * 4 (578) + 019B4994 (19B4F0C) - 3FE => 19B4B0E
Character => 59 01 => 159
Counter => 4

06E320EC >> 4 (6E320E) % 2 => 0
159 * 4 (564) + 019B4994 (19B4EF8) - 400 => 19B4AF8
Character => 51 01 => 151
Counter => 5

06E320EC >> 5 (371907) % 2 => 1
151 * 4 (544) + 019B4994 (19B4ED8) - 3FE => 19B4ADA
Character => 75 00 => 75
Counter => 6


LOOP 3
Character => 100

06E320EC >> 6 (1B8C83) % 2 => 1
100 * 4 (400) + 019B4994 (19B4D94) - 3FE => 19B4996
Character => 62 01 => 162
Counter => 7

06E320EC >> 7 (DC641) % 2 => 1
162 * 4 (588) + 019B4994 (19B4F1C) - 3FE => 19B4B1E
Character => 60 01 => 160
Counter => 8

COUNTER RESET
Counter => 0
ShiftAddress => 19C3649
ShiftVal => 20 E3 06 60 ==> 6006E320

6006E320 >> 0 (6006E320) % 2 => 0
160 * 4 (580) + 019B4994 (19B4F14) - 400 => 19B4B14
Character => 5C 01 => 15C
Counter => 1

6006E320 >> 1 (30037190) % 2 => 0
15C * 4 (570) + 019B4994 (19B4F04) - 400 => 19B4B04
Character => 55 01 => 155
Counter => 2

6006E320 >> 2 (1801B8C8) % 2 => 0
155 * 4 (554) + 019B4994 (19B4EE8) - 400 => 19B4AE8
Character => 72 00 => 72
Counter => 3


LOOP 4
Character => 100

6006E320 >> 3 (C00DC64) % 2 => 0
100 * 4 (400) + 019B4994 (19B4D94) - 400 => 19B4994
Character => 61 01 => 161
Counter => 4

6006E320 >> 4 (6006E32) % 2 => 0
161 * 4 (584) + 019B4994 (19B4F18) - 400 => 19B4B18
Character => 5D 01 => 15D
Counter => 5

6006E320 >> 5 (3003719) % 2 => 1
15D * 4 (574) + 019B4994 (19B4F08) - 3FE => 19B4B0A
Character => 57 01 => 157
Counter => 6

6006E320 >> 6 (1801B8C) % 2 => 0
157 * 4 (55C) + 019B4994 (19B4EF0) - 400 => 19B4AF0
Character => 4F 01 => 14F
Counter => 7

6006E320 >> 7 (C00DC6) % 2 => 0
14F * 4 (53C) + 019B4994 (19B4ED0) - 400 => 19B4AD0
Character => 47 01 => 147
Counter => 8

COUNTER RESET
Counter => 0
ShiftAddress => 19C364A
ShiftVal => E3 06 60 5A ==> 5A6006E3

5A6006E3 >> 0 (5A6006E3) % 2 => 1
147 * 4 (51C) + 019B4994 (19B4EB0) - 3FE => 19B4AB2
Character => 70 00 => 70
Counter => 1


LOOP 5
Character => 100

5A6006E3 >> 1 (2D300371) % 2 => 1
100 * 4 (400) + 019B4994 (19B4D94) - 3FE => 19B4996
Character => 62 01 => 162
Counter => 2

5A6006E3 >> 2 (169801B8) % 2 => 0
162 * 4 (588) + 019B4994 (19B4F1C) - 400 => 19B4B1C
Character => 5F 01 => 15F
Counter => 3

5A6006E3 >> 3 (B4C00DC) % 2 => 0
15F * 4 (57C) + 019B4994 (19B4F10) - 400 => 19B4B10
Character => 5A 01 => 15A
Counter => 4

5A6006E3 >> 4 (5A6006E) % 2 => 0
15A * 4 (568) + 019B4994 (19B4EFC) - 400 => 19B4AFC
Character => 52 01 => 152
Counter => 5

5A6006E3 >> 5 (2D30037) % 2 => 1
152 * 4 (548) + 019B4994 (19B4EDC) - 3FE => 19B4ADE
Character => 6C 00 => 6C
Counter => 6


LOOP 6
Character => 100

5A6006E3 >> 6 (169801B) % 2 => 1
100 * 4 (400) + 019B4994 (19B4D94) - 3FE => 19B4996
Character => 62 01 =>162
Counter => 7

5A6006E3 >> 7 (B4C00D) % 2 => 1
162 * 4 (588) + 019B4994 (19B4F1C) - 3FE => 19B4B1E
Character => 60 01 =>160
Counter => 8

COUNTER RESET
Counter => 0
ShiftAddress => 19C364B
ShiftVal => 06 60 5A 72 ==> 725A6006

725A6006 >> 0 (725A6006) % 2 => 0
160 * 4 (580) + 019B4994 (19B4F14) - 400 => 19B4B14
Character => 5C 01 =>15C
Counter => 1

725A6006 >> 1 (392D3003) % 2 => 1
15C * 4 (570) + 019B4994 (19B4F04) - 3FE => 19B4B06
Character => 65 00 => 65
Counter => 2


LOOP 7
Character => 100

725A6006 >> 2 (1C969801) % 2 => 1
100 * 4 (400) + 019B4994 (19B4D94) - 3FE => 19B4996
Character => 62 01 => 162
Counter => 3

725A6006 >> 3 (E4B4C00) % 2 => 0
162 * 4 (588) + 019B4994 (19B4F1C) - 400 => 19B4B1C
Character => 5F 01 => 15F
Counter => 4

725A6006 >> 4 (725A600) % 2 => 0
15F * 4 (57C) + 019B4994 (19B4F10) - 400 => 19B4B10
Character => 5A 01 => 15A
Counter => 5

725A6006 >> 5 (392D300) % 2 => 0
15A * 4 (568) + 019B4994 (19B4EFC) - 400 => 19B4AFC
Character => 52 01 => 152
Counter => 6

725A6006 >> 6 (1C96980) % 2 => 0
152 * 4 (548) + 019B4994 (19B4EDC) - 400 => 19B4ADC
Character => 4A 01 => 14A
Counter => 7

725A6006 >> 7 (E4B4C0) % 2 => 0
14A * 4 (528) + 019B4994 (19B4EBC) - 400 => 19B4ABC
Character => 00 => 00
Counter => 8

COUNTER RESET
Counter => 0
ShiftAddress => 19C364C
ShiftVal => 60 5A 72 47 ==> 47725A60


DECODING
42, 75, 72, 70, 6C, 65, 00

42 => B
75 => u
72 => r
70 => p
6C => l
65 => e
00 => \0

^ Burple
```

***You may not need that many notes, though i did it for showing how it can be done.***
<hr>

***And that's it! As you could see it requires some steps to get it manually, so i'd recommend to use the tool instead of doing it manually, if you can as it can be time intensive. I might have to edit this blog, but so far i think it looks alright. See ya until the next one i guess! ~SuperSaiyajinStackZ - 05 December 2021.***
<hr>