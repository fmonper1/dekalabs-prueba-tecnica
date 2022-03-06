import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Icon } from "@mdi/react";
import { mdiCardsHeartOutline, mdiCardsHeart } from "@mdi/js";
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
  const [favourites, setFavourites] = useState({});
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
        <h2>List of Drinks</h2>
        <ul className="grid grid-cols-4 gap-4">
          {data
            ? data.map((item) => (
                <li className="border rounded relative">
                  <div className="absolute w-full flex justify-end p-2">
                    <div className="bg-white p-1 px-2 rounded">
                      {item.strCategory}
                    </div>
                  </div>
                  <img src={item.strDrinkThumb} className="rounded-t" />
                  <div className="p-2 flex justify-between">
                    <h3>{item.strDrink}</h3>
                    {!favourites[item.idDrink] ? (
                      <button
                        onClick={() =>
                          setFavourites((old) => ({
                            ...old,
                            [item.idDrink]: item,
                          }))
                        }
                      >
                        <Icon path={mdiCardsHeartOutline} size={1} />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setFavourites((old) => ({
                            ...old,
                            [item.idDrink]: false,
                          }))
                        }
                      >
                        <Icon path={mdiCardsHeart} size={1} color="red" />
                      </button>
                    )}
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </main>
  );
}

export default App;
