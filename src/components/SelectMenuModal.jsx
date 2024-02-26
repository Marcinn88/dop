import React, { useState } from 'react';
import selectStyles from './SelectMenuModal.module.css';
import { nanoid } from 'nanoid';

export const SelectMenuModal = ({ placeholder, onClick, data }) => {
  const [selectModal, setSelectModal] = useState(false);
  const [selectName, setSelectName] = useState(`${placeholder}`);

  const toogleSelectModal = () => {
    setSelectModal(!selectModal);
    console.log('data', data);
  };
  const changeName = e => {
    const newName = e.innerText;
    setSelectName(newName);
    setSelectModal(!selectModal);
    return newName;
  };

  return (
    <>
      <div className={selectStyles.wrapper}>
        {selectName === placeholder ? (
          <div
            onClick={toogleSelectModal}
            className={selectStyles.selectBtnGrey}
          >
            <span>{selectName}</span>
          </div>
        ) : (
          <div onClick={toogleSelectModal} className={selectStyles.selectBtn}>
            <span>{selectName}</span>
          </div>
        )}
        {selectModal && (
          <div className={selectStyles.optionsContainer}>
            <ul className={selectStyles.options}>
              {data.map(({ album }) => {
                return (
                  <li
                    key={nanoid()}
                    onClick={e => {
                      changeName(e.target);
                      onClick(e.target.innerText);
                    }}
                    className={selectStyles.option}
                  >
                    <span>{album}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {selectModal && (
        <div
          className={selectStyles.backdrop}
          onClick={toogleSelectModal}
        ></div>
      )}
    </>
  );
};
