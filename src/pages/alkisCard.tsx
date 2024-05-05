import { Alkis } from "../types/alkis";

export const AlkisCard = (alkis: Alkis): JSX.Element => {
  return (
    <div class="flex flex-row items-center bg-white border border-gray-200 shadow p-2 w-full md:w-[calc(50%-1rem)] md:m-2 xl:w-[calc(33.3%-1rem)] xl:my-2 xl:mx-auto">
      <img class="object-cover w-16" src={getImage(alkis.id)} alt="" />
      <div class="flex flex-col w-full justify-between p-4 leading-normal">
        <h5 class="text-l tracking-tight text-gray-500">
          {alkis.categories.slice(0, 2).join(" - ")}
        </h5>
        <h5 class="mb-2 text-xl tracking-tight text-gray-900">{alkis.name}</h5>
        <div class="flex flex-row content-start">
          <p class="text-2xl font-bold text-gray-900">
            Kr {(alkis.price / 100).toLocaleString("no", {minimumFractionDigits: 2,maximumFractionDigits: 2})}
          </p>
          <p class="ml-2 font-bold self-end text-gray-600">
            {(alkis.volume / 10).toLocaleString("no")} cl
          </p>
        </div>
        <p class="mb-3 font-normal text-gray-700">
          {(alkis.alcoholByVolume / 10).toLocaleString("no")}%
        </p>

        <p class="font-normal text-gray-700">
          <span class="text-[#B91048] font-black text-xl">
            Kr {(alkis.pricePerAlcohol / 100).toLocaleString("no", {minimumFractionDigits: 2,maximumFractionDigits: 2})}
          </span>{" "}
          per liter ren alkohol
        </p>
        <a
          href={`https://www.vinmonopolet.no/p/${alkis.id}`}
          target="_blank"
          class="block bg-emerald-700 w-fit text-gray-100 p-2 mt-2 mb-0 rounded-md text-left hover:bg-emerald-800 font-medium text-sm"
        >
          Til Vinmonopolet
        </a>
      </div>
    </div>
  );
};

const getImage = (id: bigint) => {
  return `https://bilder.vinmonopolet.no/cache/300x300-0/${id}-1.jpg`;
};
