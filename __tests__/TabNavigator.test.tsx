/**
 * @format
 */

import 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {it, describe, expect} from '@jest/globals';

describe('TabNavigator', () => {
  it('createBottomTabNavigator should be defined', () => {
    const Tab = createBottomTabNavigator();
    expect(Tab).toBeDefined();
    expect(Tab.Navigator).toBeDefined();
    expect(Tab.Screen).toBeDefined();
  });

  it('can create tab navigator structure', () => {
    const Tab = createBottomTabNavigator();
    const navigator = Tab.Navigator;
    const screen = Tab.Screen;
    
    expect(navigator).toBeDefined();
    expect(screen).toBeDefined();
  });
});