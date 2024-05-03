import { AlkisList } from "./alkisList";

export const AlkisListPage = (): JSX.Element => {
  return (
    <div>
      <form hx-get="/alkis" hx-target="#alkis-list" hx-swap="innerHTML">
        <nav
          x-data="{ filtersOpen: false }"
          class="bg-emerald-900 fixed w-full z-20 top-0 start-0 "
        >
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
                placeholder=""
              />
            </div>
            <button
              x-on:click="filtersOpen = !filtersOpen"
              type="button"
              class="inline-block absolute right-3 h-10 w-10"
            >
              <p class="text-4xl">🎛</p>️
            </button>
            <div
              x-show="filtersOpen"
              x-cloak
              class="flex flex-col shadow mt-3 bg-gray-100/50 backdrop-blur-xl border border-gray-100 rounded-lg p-4 max-h-[70vh] overflow-y-scroll w-full md:right-2 md:absolute md:w-[calc(50%-1rem)] xl:w-[calc(33.3%-1rem)]"
            >
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Kategori
              </label>
              <select
                id="category"
                name="category"
                class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="" selected>
                  Velg en kategori
                </option>
                <option value="Rødvin">Rødvin</option>
                <option value="Hvitvin">Hvitvin</option>
                <option value="Rosévin">Rosévin</option>
                <option value="Brennevin">Brennevin</option>
                <option value="Øl">Øl</option>
                <option value="Sider">Sider</option>
              </select>
              <div class="flex flex-row justify-between w-full">
                <div class="flex flex-col">
                  <label
                    for="minPrice"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Pris fra
                  </label>
                  <input
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    for="maxPrice"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Pris til
                  </label>
                  <input
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
              <div class="flex flex-row justify-between w-full">
                <div class="flex flex-col">
                  <label
                    for="minAlcohol"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Alkohol fra
                  </label>
                  <input
                    id="minAlcohol"
                    name="minAlcohol"
                    type="number"
                    class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    for="maxAlcohol"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Alkohol til
                  </label>
                  <input
                    id="maxAlcohol"
                    name="maxAlcohol"
                    type="number"
                    class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
              <div class="flex flex-row justify-between w-full">
                <div class="flex flex-col">
                  <label
                    for="minVolume"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Volum fra
                  </label>
                  <input
                    id="minVolume"
                    name="minVolume"
                    type="number"
                    class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
                <div class="flex flex-col">
                  <label
                    for="maxVolume"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Volum til
                  </label>
                  <input
                    id="maxVolume"
                    name="maxVolume"
                    type="number"
                    class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
              <button class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-36">
                Søk
              </button>
            </div>
          </div>
        </nav>
      </form>
      <main>
        <div class="h-16"></div>
        <div id="alkis-list" class="flex flex-row flex-wrap">
          {AlkisList({})}
        </div>
        <svg
          id="spinner"
          width="100"
          height="100"
          viewbox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          class="htmx-request"
        >
          <circle
            cx="20"
            cy="20"
            fill="none"
            r="10"
            stroke="#383a36"
            stroke-width="2"
          >
            <animate
              attributeName="r"
              from="8"
              to="20"
              dur="1.5s"
              begin="0s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1.5s"
              begin="0s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </main>
    </div>
  );
};
