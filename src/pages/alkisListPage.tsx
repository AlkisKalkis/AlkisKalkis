import { AlkisList } from "./alkisList";

export const AlkisListPage = (): JSX.Element => {
  return (
    <div>
      <nav class="bg-emerald-900 fixed w-full z-20 top-0 start-0 ">
        <div class="w-full h-16 p-3 relative">
          <a href="#" class="inline-block">
            <img
              src="https://www.alkiskalkis.no/img/AlkisKalkisSmall.df7c8d37.png"
              class="h-10 w-10"
              alt="AlkisKalkis logo"
            />
          </a>
          <div class="inline-block -translate-x-1/2 -translate-y-1/2 z-50 absolute left-1/2 top-1/2 w-36 focus-within:w-[calc(100vw-20px)] transition-all duration-300 ease-in-out transform bg-emerald-900">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-400 peer-focus:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              name="name"
              class="block w-full p-3 ps-10 text-sm text-gray-200 focus:text-gray-900 rounded-3xl bg-emerald-950 focus:bg-gray-50 transition-all duration-100"
              hx-trigger="keyup changed delay:500ms"
              hx-get="/alkis"
              hx-target="#alkis-list"
              hx-swap="innerHTML"
              placeholder=""
            />
          </div>
          <div class="inline-block absolute right-3 h-10 w-10">
            <p class="text-2xl">🎛</p>️
          </div>
        </div>
      </nav>
      <main>
        <div class="h-16"></div>
        <div id="alkis-list">
          {AlkisList({})}
        </div>
        <svg id="spinner" width="100" height="100" viewbox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" fill="none" r="10" stroke="#383a36" stroke-width="2">
            <animate attributeName="r" from="8" to="20" dur="1.5s" begin="0s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite"/>
          </circle>
        </svg>

      </main>
    </div>
  );
};
