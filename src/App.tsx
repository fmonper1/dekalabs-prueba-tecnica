import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Icon } from "@mdi/react";
import { mdiCardsHeartOutline, mdiCardsHeart } from "@mdi/js";
import { DrinkCard } from "./components/DrinkCard";
import { useLocalStorage } from "./hooks/useLocalStorage";
const useCocktails = (keyword: string) => {
  const [data, setData] = useState<Record<string, any>[] | null>(null);

  useEffect(() => {
    const onMount = async () => {
      const res = await (
        await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`
        )
      ).json();
      setData(res.drinks);
    };
    onMount();
  }, [keyword]);

  return data;
};

function App() {
  const [search, setSearch] = useState("");
  const [favourites, setFavourites] = useLocalStorage("favourites", {});
  const data = useCocktails(search);
  return (
    <main>
      <header className="flex justify-between p-4 ">
        <h1 className="text-2xl font-bold">DrinkMate!</h1>
        <div>
          <label htmlFor="search">Search: </label>
          <input
            name="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      <div className="p-4">
        <h2 className="mb-4">List of Drinks</h2>
        <ul className="grid grid-cols-4 gap-4">
          {data
            ? data.map((item) => (
                <li>
                  <DrinkCard
                    item={item}
                    setFavourites={setFavourites}
                    isFavourite={!!favourites[item.idDrink]}
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
    </main>
  );
}

export default App;
