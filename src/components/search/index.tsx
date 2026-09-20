import { View, Text, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

export function Search() {
  return (
    <View className='w-full flex-row border border-slate-500 rounded-xl items-center gap-2 px-4 bg-neutral-800'>
      <Ionicons name="search" size={24} color="#D4A24C" />

      <TextInput
      placeholder='Buscar serviços...'
      placeholderTextColor='#737373'
      className='w-full h-full text-white' />
    </View>
  )
}
