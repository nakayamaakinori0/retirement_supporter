import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { TodoItem } from '../constants/todoItems';

type TodoListItemProps = {
  item: TodoItem;
  completed: boolean;
  expanded: boolean;
  onToggleCompleted: () => void;
  onToggleExpanded: () => void;
};

export default function TodoListItem({
  item,
  completed,
  expanded,
  onToggleCompleted,
  onToggleExpanded,
}: TodoListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          testID={`checkbox-${item.id}`}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: completed }}
          accessibilityLabel={item.title}
          onPress={onToggleCompleted}
          style={styles.checkboxArea}>
          <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          testID={`title-${item.id}`}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          onPress={onToggleExpanded}
          style={styles.titleArea}>
          <Text style={[styles.title, completed && styles.titleCompleted]}>
            {item.title}
          </Text>
          <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>
      </View>

      {expanded && (
        <View testID={`description-${item.id}`} style={styles.descriptionArea}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxArea: {
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.accent,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  titleArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    paddingVertical: 16,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.primary,
  },
  titleCompleted: {
    color: Colors.secondary,
    textDecorationLine: 'line-through',
  },
  chevron: {
    marginLeft: 8,
    fontSize: 10,
    color: Colors.secondary,
  },
  descriptionArea: {
    paddingLeft: 50,
    paddingRight: 16,
    paddingBottom: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.secondary,
  },
});
