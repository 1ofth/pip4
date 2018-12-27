import React from 'react';

export default class Header extends React.Component{
  render(){
    return(
      <div className={"header"}>
        <div className={'authors'} >
             Ибраимов Эдем, Морозов Иван, P3212.
        </div>
        <div className={'Variant'}>
          569812
        </div>
      </div>
    )
  }
}