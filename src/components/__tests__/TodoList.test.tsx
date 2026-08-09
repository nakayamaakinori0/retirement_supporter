import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoListScreen from '../../../app/(tabs)/todo-list';
import { todoItems } from '../../constants/todoItems';

const getItemMock = AsyncStorage.getItem as jest.Mock;
const setItemMock = AsyncStorage.setItem as jest.Mock;

const firstItem = todoItems[0];
const secondItem = todoItems[1];

/** 保存済みデータの読み込みが終わるまで待つ */
const renderLoaded = async () => {
  const utils = render(<TodoListScreen />);
  await waitFor(() => expect(getItemMock).toHaveBeenCalled());
  // 読み込み完了の setState を反映させる
  await act(async () => {});
  return utils;
};

describe('TodoListScreen', () => {
  beforeEach(() => {
    getItemMock.mockReset();
    getItemMock.mockResolvedValue(null);
    setItemMock.mockReset();
    setItemMock.mockResolvedValue(undefined);
  });

  it('すべての項目を描画する', async () => {
    const { getByText } = await renderLoaded();

    todoItems.forEach(item => {
      expect(getByText(item.title)).toBeTruthy();
    });
  });

  it('未完了なら達成数が0で表示される', async () => {
    const { getByTestId } = await renderLoaded();

    expect(getByTestId('progress-count').props.children).toBe(
      `0/${todoItems.length} 完了`,
    );
  });

  it('チェックすると達成数が増える', async () => {
    const { getByTestId } = await renderLoaded();

    fireEvent.press(getByTestId(`checkbox-${firstItem.id}`));

    expect(getByTestId('progress-count').props.children).toBe(
      `1/${todoItems.length} 完了`,
    );
  });

  it('チェックすると完了IDがAsyncStorageに保存される', async () => {
    const { getByTestId } = await renderLoaded();

    fireEvent.press(getByTestId(`checkbox-${firstItem.id}`));

    expect(setItemMock).toHaveBeenCalledWith(
      'todoCompletedIds',
      JSON.stringify([firstItem.id]),
    );
  });

  it('チェック済みの項目を再度押すと外れる', async () => {
    getItemMock.mockResolvedValue(JSON.stringify([firstItem.id]));
    const { getByTestId } = await renderLoaded();

    expect(getByTestId('progress-count').props.children).toBe(
      `1/${todoItems.length} 完了`,
    );

    fireEvent.press(getByTestId(`checkbox-${firstItem.id}`));

    expect(getByTestId('progress-count').props.children).toBe(
      `0/${todoItems.length} 完了`,
    );
    expect(setItemMock).toHaveBeenCalledWith('todoCompletedIds', '[]');
  });

  it('保存済みの完了状態を復元する', async () => {
    getItemMock.mockResolvedValue(
      JSON.stringify([firstItem.id, secondItem.id]),
    );

    const { getByTestId } = await renderLoaded();

    expect(getByTestId('progress-count').props.children).toBe(
      `2/${todoItems.length} 完了`,
    );
  });

  it.each([
    ['JSONとして壊れている', 'not a json'],
    ['配列ではない', '{"foo":"bar"}'],
    ['文字列以外が混ざっている', '[1,2,3]'],
  ])('保存データが不正（%s）でもクラッシュしない', async (_, stored) => {
    getItemMock.mockResolvedValue(stored);

    const { getByTestId } = await renderLoaded();

    expect(getByTestId('progress-count').props.children).toBe(
      `0/${todoItems.length} 完了`,
    );
  });

  it('定数から消えたIDが保存されていても達成数に含めない', async () => {
    getItemMock.mockResolvedValue(
      JSON.stringify([firstItem.id, 'removed-item-id']),
    );

    const { getByTestId } = await renderLoaded();

    expect(getByTestId('progress-count').props.children).toBe(
      `1/${todoItems.length} 完了`,
    );
  });

  it('タイトルを押すと説明が開閉する', async () => {
    const { getByTestId, queryByTestId } = await renderLoaded();

    expect(queryByTestId(`description-${firstItem.id}`)).toBeNull();

    fireEvent.press(getByTestId(`title-${firstItem.id}`));
    expect(getByTestId(`description-${firstItem.id}`)).toBeTruthy();

    fireEvent.press(getByTestId(`title-${firstItem.id}`));
    expect(queryByTestId(`description-${firstItem.id}`)).toBeNull();
  });

  it('説明を開いても完了状態は変わらない', async () => {
    const { getByTestId } = await renderLoaded();

    fireEvent.press(getByTestId(`title-${firstItem.id}`));

    expect(getByTestId('progress-count').props.children).toBe(
      `0/${todoItems.length} 完了`,
    );
    expect(setItemMock).not.toHaveBeenCalled();
  });

  it('保存に失敗しても未処理のrejectionにならない', async () => {
    setItemMock.mockRejectedValue(new Error('保存失敗'));
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { getByTestId } = await renderLoaded();

    fireEvent.press(getByTestId(`checkbox-${firstItem.id}`));
    await act(async () => {});

    // 失敗してもUI上の完了状態は維持され、エラーはログに出る
    expect(getByTestId('progress-count').props.children).toBe(
      `1/${todoItems.length} 完了`,
    );
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('全項目を完了すると完了メッセージを表示する', async () => {
    getItemMock.mockResolvedValue(
      JSON.stringify(todoItems.map(item => item.id)),
    );

    const { getByTestId } = await renderLoaded();

    expect(getByTestId('all-completed-message')).toBeTruthy();
  });

  it('未完了の項目が残っていれば完了メッセージを表示しない', async () => {
    const { queryByTestId } = await renderLoaded();

    expect(queryByTestId('all-completed-message')).toBeNull();
  });
});
