// components/PaginatedList.jsx
import React from 'react';
import { FlatList } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingIndicator from './LoadingIndicator';
import ErrorState from './ErrorState';

const PaginatedList = ({
  queryKey,
  fetchFn,
  renderItem,
  pageSize = 20,
  listProps = {},
  getNextPageParamFn,
}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => fetchFn(pageParam, pageSize),
    getNextPageParam: getNextPageParamFn,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || 'Something went wrong'}
        onRetry={() => fetchNextPage()}
      />
    );
  }

  const allItems = data ? data.pages.flat() : [];

  return (
    <FlatList
      data={allItems}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <LoadingIndicator message="Loading more..." size="small" /> : null
      }
      {...listProps}
    />
  );
};

export default PaginatedList;
