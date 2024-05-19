import {View, GestureResponderEvent} from 'react-native';

function measureLayout(view: View): Promise<{
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}> {
  return new Promise(resolve => {
    view.measure((x, y, width, height, pageX, pageY) => {
      resolve({x, y, width, height, pageX, pageY});
    });
  });
}

export default async function isOuterAreaClick(
  view: View,
  event: GestureResponderEvent,
): Promise<boolean> {
  const layout = await measureLayout(view);
  const {pageX: clickPageX, pageY: clickPageY} = event.nativeEvent;
  return (
    clickPageX < layout.pageX ||
    clickPageX > layout.width + layout.pageX ||
    clickPageY < layout.pageY ||
    clickPageY > layout.height + layout.pageY
  );
}
