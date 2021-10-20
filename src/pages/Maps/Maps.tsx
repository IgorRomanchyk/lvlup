import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Listbox";
import Mapstable from "components/Mapstable";
import { setActiveMap, fetchData, getMaterials } from "store/Slice";
import "./Maps.scss";
import { RootState } from "store";

const Maps = () => {
  const maps = useSelector((state: RootState) => state.data.maps)
  const activeMap = useSelector((state: RootState) => state.data.activeMap)
  const materials = useSelector((state: RootState) => state.data.materials)
  const loading = useSelector((state: RootState) => state.data.loading)
  const error = useSelector((state: RootState) => state.data.error)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  const onChangeMap = (map: string): void => {
    // сменить в redux current map 
    maps?.map((item) => {
      if (item.name === map) {
        dispatch(setActiveMap(item))
      }
    })
    dispatch(getMaterials(map))
  }

  // const authUser = async () => {
  //   await fetch(`${BASE_URL}/login/get-token-data`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization" : token
  //     },
  //   })
  //     .then(res => console.log(res.json()))
  //     .catch(() => {
  //       console.log('Error')
  //     });

  if (error) {
    return <div>Ошибка загрузки данных</div>;
  }
  
  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      {activeMap && maps && <Select onChange={onChangeMap} activeValue={activeMap} options={maps}/>}
      {activeMap && materials && (
        <Mapstable
          activeValue={activeMap}
          materials={materials}
        />
      )}
    </div>
  );
  
};

export default Maps;
