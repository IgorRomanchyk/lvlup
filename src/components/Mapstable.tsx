import React from "react";
import { useSelector } from "react-redux";
import IMaterial from "types/Material";
import IMap from "types/Map";
import MaterialsItem from "./MaterialsItem";
import { RootState } from "store";

interface IProps {
  activeValue: IMap;
  materials: IMaterial[];
}

const Mapstable = ({ activeValue, materials }: IProps) => {
  const loading = useSelector((state: RootState) => state.data.loadingMaterial);
  const error = useSelector((state: RootState) => state.data.errorMaterial);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (loading) {
    return (
      <div className=" flex justify-center items-center m-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="py-28 text-center">
      {activeValue &&
        activeValue.levels.map((item, i) => (
          <div key={item.label}>
            <div className="py-2 text-4xl font-semibold tracking-widest mt-14">
              Уровень {item.lvl}
            </div>
            <div className="font-sans">{item.descr}</div>
            <div className="flex justify-center flex-wrap mt-8">
              {materials.map((item, id) => {
                if (i === item.lvl) {
                  return (
                    <MaterialsItem id={id} materials={item} key={item._id} />
                  );
                }
              })}
            </div>
          </div>
        ))}
    </div>
  );
};
export default Mapstable;
