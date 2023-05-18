export const Search = () => {
  const $Search = document.querySelector("#Search");
  if (!$Search) return;
  let debounceTimer = 0;
  const refs = [...document.querySelectorAll("article[id^=reference]")];
  const models = refs.map((ref) => ({
    id: ref.id,
    title: ref.querySelector(".-reference").innerText.toLowerCase(),
    link: ref.querySelector(".-reference").href.toLowerCase(),
    year: ref.dataset.year,
    content: ref.children[2] ? ref.children[1].innerText.toLowerCase() : null,
  }));

  const getMatchedIds = (lc_query) =>
    models
      .filter(
        ({ title, link, year, content }) =>
          RegExp(lc_query).test(title) ||
          RegExp(lc_query).test(link) ||
          RegExp(lc_query).test(year) ||
          RegExp(lc_query).test(content)
      )
      .map(({ id }) => id);

  const search = (query) => {
    const ids = getMatchedIds(query.toLowerCase());
    refs.forEach((ref) =>
      ids.includes(ref.id)
        ? ref.removeAttribute("hidden")
        : ref.setAttribute("hidden", "")
    );
  };

  const reset = () => refs.forEach((ref) => ref.removeAttribute("hidden"));

  const handleInput = (query) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer =
      query === ""
        ? setTimeout(() => reset(), 1000 / 30)
        : setTimeout(() => search(query), 1000 / 30);
  };

  const handleReset = () => reset();

  $Search.addEventListener("input", (e) => handleInput(e.target.value), false);
  $Search.addEventListener("reset", () => handleReset(), false);
};
