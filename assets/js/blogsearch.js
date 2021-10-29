/*
	This file is part of SuperSaiyajinStackZ.github.io.
	Copyright (C) 2020-2021 by SuperSaiyajinStackZ.

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Additional Terms 7.b and 7.c of GPLv3 apply to this file:
		* Requiring preservation of specified reasonable legal notices or
		  author attributions in that material or in the Appropriate Legal
		  Notices displayed by works containing it.
		* Prohibiting misrepresentation of the origin of that material,
		  or requiring that modified versions of such material be marked in
		  reasonable ways as different from the original version.
*/

const BlogAmount = 0; // Currently 0 blogs available.

document.getElementById("blogsearchinput").onkeyup = function() {
	return; // Just return, as we don't have any blogs currently.

	const SearchResult = document.getElementById("blogsearchinput").value;

	for (let Idx = 0; Idx < BlogAmount; Idx++) {
		if (SearchResult == "") { // Un-hide if hidden, cause cleared.
			if (document.getElementById("blog_" + Idx.toString()).classList.contains("hide")) document.getElementById("blog_" + Idx.toString()).classList.remove("hide");

		} else {
			const Element = document.getElementById("blog_" + Idx.toString()).getElementsByTagName("a")[0];

			/* Contains the blog in the search, so we show. */
			if (Element.innerHTML.includes(SearchResult)) {
				if (document.getElementById("blog_" + Idx.toString()).classList.contains("hide")) document.getElementById("blog_" + Idx.toString()).classList.remove("hide");

			/* Does not contain the blog in the search, so we hide. */
			} else {
				if (!document.getElementById("blog_" + Idx.toString()).classList.contains("hide")) document.getElementById("blog_" + Idx.toString()).classList.add("hide");
			}
		}
	}
};