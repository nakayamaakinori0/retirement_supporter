import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DateData } from 'react-native-calendars';
import CalenderModal from '../CalenderModal';

const makeDay = (dateString: string): DateData => {
  const [year, month, day] = dateString.split('-').map(Number);
  return {
    dateString,
    day,
    month,
    year,
    timestamp: Date.parse(dateString),
  };
};

describe('CalenderModal', () => {
  it('カレンダーを描画する', () => {
    const { getByTestId } = render(
      <CalenderModal onDayPress={jest.fn()} selectedDate="" />,
    );

    expect(getByTestId('calendar')).toBeTruthy();
  });

  it('日付をタップすると onDayPress にその日付を渡す', () => {
    const onDayPress = jest.fn();
    const { getByTestId } = render(
      <CalenderModal onDayPress={onDayPress} selectedDate="" />,
    );

    fireEvent(getByTestId('calendar'), 'onDayPress', makeDay('2026-01-15'));

    expect(onDayPress).toHaveBeenCalledWith(
      expect.objectContaining({ dateString: '2026-01-15' }),
    );
  });

  it('選択済みの日付を再タップすると選択を解除する', () => {
    const onDayPress = jest.fn();
    const { getByTestId } = render(
      <CalenderModal onDayPress={onDayPress} selectedDate="2026-01-15" />,
    );

    fireEvent(getByTestId('calendar'), 'onDayPress', makeDay('2026-01-15'));

    expect(onDayPress).toHaveBeenCalledWith(
      expect.objectContaining({ dateString: '' }),
    );
  });

  it('選択中の日付を markedDates に反映する', () => {
    const { getByTestId } = render(
      <CalenderModal onDayPress={jest.fn()} selectedDate="2026-01-15" />,
    );

    expect(getByTestId('calendar').props.markedDates).toEqual({
      '2026-01-15': expect.objectContaining({ selected: true }),
    });
  });

  it('minDate をそのまま Calendar に渡す', () => {
    const { getByTestId } = render(
      <CalenderModal
        onDayPress={jest.fn()}
        selectedDate=""
        minDate="2026-01-01"
      />,
    );

    expect(getByTestId('calendar').props.minDate).toBe('2026-01-01');
  });
});
