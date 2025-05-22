import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { CartProvider } from './CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default memo(App);
