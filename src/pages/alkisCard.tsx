import { Alkis } from "../types/alkis";

export const AlkisCard = (alkis: Alkis): JSX.Element => {
  return (
    <a
      href={`https://www.vinmonopolet.no/p/${alkis.id}`}
      class="flex flex-row items-center bg-white border border-gray-200 shadow md:max-w-xl hover:bg-gray-100 p-2"
    >
      <img class="object-cover w-16 h-44" src={getImage()} alt="" />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="text-l tracking-tight text-gray-500">
          {alkis.categories.slice(0, 2).join(" - ")}
        </h5>
        <h5 class="mb-2 text-xl tracking-tight text-gray-900">{alkis.name}</h5>
        <div class="flex flex-row content-start">
          <p class="text-2xl font-bold text-gray-900">
            Kr {(alkis.price / 100).toFixed(2).toLocaleString("no")}
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
            Kr {(alkis.pricePerAlcohol / 100).toFixed(2).toLocaleString("no")}
          </span>{" "}
          per liter ren alkohol
        </p>
      </div>
    </a>
  );
};

const getImage = () => {
  const urls = [
    "https://bilder.vinmonopolet.no/cache/300x300-0/10055702-1.jpg",
    "https://bilder.vinmonopolet.no/cache/300x300-0/10349902-1.jpg",
    "https://bilder.vinmonopolet.no/cache/300x300-0/13003502-1.jpg",
    "https://bilder.vinmonopolet.no/cache/300x300-0/7666202-1.jpg",
    "https://bilder.vinmonopolet.no/cache/300x300-0/11258501-1.jpg",
    "https://bilder.vinmonopolet.no/cache/300x300-0/14611801-1.jpg",
    "https://bilder.vinmonopolet.no/cache/300x300-0/15992802-1.jpg",
  ];

  // Return a random image from urls
  return urls[Math.floor(Math.random() * urls.length)];
};
