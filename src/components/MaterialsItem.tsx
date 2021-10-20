import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import { MouseOverToolkit, MouseLeaveToolkit, setCopied } from "store/Slice";


const MaterialsItem = ({ materials, id }: any) => {
  const valueToolkit = useSelector((state: any) => state.data.value.value)
  const copiedToolkit = useSelector((state: any) => state.data.value.copied)
  const dispatch = useDispatch()
  const classes = materials.op ? "hidden" : `text-base`;
  return (
    <div
      className={`flex flex-col justify-between w-80 h-28 py-1.5 px-3 m-7 bg-gray-200 rounded-lg text-2xl text-left duration-500 transform hover:bg-blue-200 hover:-translate hover:scale-110`}
      key={materials._id}
      onMouseOver={() => dispatch(MouseOverToolkit(id))}
      onMouseLeave={() => dispatch(MouseLeaveToolkit(id))}
    >
      <div>{materials.title}</div>
      <div className={classes}>{materials.subtitle}</div>
      {materials.op ? (
        <CopyToClipboard
          text={valueToolkit}
          onCopy={() => {
            dispatch(setCopied(true));
            setTimeout(() => {
              dispatch(setCopied(false));
            }, 500);
          }}
        >
          {!copiedToolkit ? (
            <button className="w-32 text-center rounded-lg p-1 bg-yellow-200 cursor-pointer hover:bg-yellow-300">
              Copy link
            </button>
          ) : (
            <button className="w-32 text-center rounded-lg p-1 bg-green-200 cursor-pointer">
              Copied
            </button>
          )}
        </CopyToClipboard>
      ) : null}
    </div>
  );
};

export default MaterialsItem;
