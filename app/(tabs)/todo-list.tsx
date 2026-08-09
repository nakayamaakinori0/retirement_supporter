import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../src/constants/colors';
import { todoItems } from '../../src/constants/todoItems';
import TodoListItem from '../../src/components/TodoListItem';

const STORAGE_KEY = 'todoCompletedIds';

/**
 * 保存済みの完了IDを読み出す。
 * 壊れたデータが入っていてもアプリを落とさず、未完了として扱う。
 */
const loadCompletedIds = async (): Promise<string[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
};

export default function TodoListScreen() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadCompletedIds().then(ids => {
      setCompletedIds(ids);
      setIsLoaded(true);
    });
  }, []);

  // 定数から削除されたIDが保存されていても数に含めない
  const completedCount = useMemo(
    () => todoItems.filter(item => completedIds.includes(item.id)).length,
    [completedIds],
  );
  const isAllCompleted = completedCount === todoItems.length;

  const handleToggleCompleted = useCallback(
    (id: string) => {
      // 読み込み前に操作すると、復元された状態で上書きされてしまう
      if (!isLoaded) return;

      // 保存は更新関数の外で行う。更新関数は純粋に保ち、
      // 保存に失敗しても未処理の rejection にならないようにする
      const next = completedIds.includes(id)
        ? completedIds.filter(completedId => completedId !== id)
        : [...completedIds, id];

      setCompletedIds(next);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(error => {
        console.error('やることリストの保存に失敗しました:', error);
      });
    },
    [isLoaded, completedIds],
  );

  const handleToggleExpanded = useCallback((id: string) => {
    setExpandedIds(prev =>
      prev.includes(id)
        ? prev.filter(expandedId => expandedId !== id)
        : [...prev, id],
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text testID="progress-count" style={styles.progressCount}>
          {`${completedCount}/${todoItems.length} 完了`}
        </Text>
        <View style={styles.progressBarTrack}>
          <View
            testID="progress-bar"
            style={[
              styles.progressBarFill,
              { width: `${(completedCount / todoItems.length) * 100}%` },
            ]}
          />
        </View>
        {isAllCompleted && (
          <Text testID="all-completed-message" style={styles.allCompleted}>
            おつかれさま！やることは全部おわりました
          </Text>
        )}
      </View>

      <ScrollView testID="todo-scroll-view">
        {todoItems.map(item => (
          <TodoListItem
            key={item.id}
            item={item}
            completed={completedIds.includes(item.id)}
            expanded={expandedIds.includes(item.id)}
            onToggleCompleted={() => handleToggleCompleted(item.id)}
            onToggleExpanded={() => handleToggleExpanded(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  progressCount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.bgSecondary,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  allCompleted: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
  },
});
