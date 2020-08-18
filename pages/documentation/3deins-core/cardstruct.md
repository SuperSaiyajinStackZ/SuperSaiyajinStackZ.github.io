---
title: 3DEins-Core Documentation | CardStruct
description: CardStruct of 3DEins-Core.
permalink: /documentation/3deins-core/cardstruct
---

# 3DEins-Core Documentation -- CardStruct

## The CardStruct is a struct, which is written like the following:

```cpp
/*	Card Struct. A CardStruct contains:
*	1.) Card Color (Like Green, Blue, Yellow, Red, Black.)
*	2.) Card Type (Like 0, 4, 7, Plus 2, Wild, etc.)
*	Size: u16 || 2x u8.
*/

struct CardStruct {
	CardColor CC;
	CardType CT;
};
```

The CardStruct contains a [CardType](cardtype) and a [CardColor](cardcolor).

To return back to the index, please click [here](index).