import { mdiCardsHeart, mdiCardsHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Card } from "./Card";
import { Dialog } from "./Dialog";

type CardProps = {
  item: any;
  isFavourite: boolean;
  setFavourites: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};
export const DrinkCard = ({ item, isFavourite, setFavourites }: CardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Card>
        <div className="absolute w-full flex justify-end p-2">
          <div className="bg-white p-1 px-2 rounded text-sm">
            {item.strCategory}
          </div>
        </div>
        <img
          src={item.strDrinkThumb}
          className="rounded-t cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        <div className="p-2 flex justify-between">
          <h3>{item.strDrink}</h3>
          {!isFavourite ? (
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
                  [item.idDrink]: item,
                }))
              }
            >
              <Icon path={mdiCardsHeart} size={1} color="red" />
            </button>
          )}
        </div>
      </Card>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen} title={item.strDrink}>
        <div className="flex flex-col gap-2">
          <div>
            <div
              className="bg-cover bg-center h-48"
              style={{ backgroundImage: `url(${item.strDrinkThumb})` }}
            ></div>
          </div>
          <div>
            <h3>Category</h3>
            {item.strCategory}
          </div>
          <div>
            <h3>Glass</h3>
            {item.strGlass}
          </div>

          <div>
            <h3>Ingredients</h3>
            <ul className="list list-disc pl-6">
              {new Array(15)
                .fill(0)
                .map((_, i) =>
                  item[`strIngredient${i + 1}`] ? (
                    <li>{item[`strIngredient${i + 1}`]}</li>
                  ) : null
                )}
            </ul>
          </div>
          <div>
            <h3>Instructions</h3>
            {item.strInstructions}
          </div>
        </div>
      </Dialog>
    </>
  );
};
