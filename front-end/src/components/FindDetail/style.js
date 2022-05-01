import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px; */
  width: 100%;
  z-index: 1000;
  overflow: hidden;
  background: ${style["default-color"]};
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: all .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: all .3s;
    transform: translate3d(100%, 0, 0);
  }
`
export const Buttom = styled.div`
  position: fixed;
  /* top: 0; */
  left: 0;
  right: 0;
  bottom: 0; 
`
export const NavBarStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
`
export const ContentStyle = styled.div`
  margin-top: 0.72rem;
`