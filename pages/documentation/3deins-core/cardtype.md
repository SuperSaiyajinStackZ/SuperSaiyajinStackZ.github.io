---
title: 3DEins-Core Documentation | CardType
description: CardType of 3DEins-Core.
permalink: /documentation/3deins-core/cardtype
---

# 3DEins-Core Documentation -- CardType

## The CardType is an enum class, which is written like the following:

```cpp
/* The CardTypes. */
enum class CardType {
	NUMBER_0,
	NUMBER_1,
	NUMBER_2,
	NUMBER_3,
	NUMBER_4,
	NUMBER_5,
	NUMBER_6,
	NUMBER_7,
	NUMBER_8,
	NUMBER_9,
	REVERSE,
	SKIP,
	DRAW2,
	WILD,
	DRAW4
	#ifdef _USE_SPECIAL_CARD
	,SPECIAL
	#endif
};
```

To return back to the index, please click [here](index).