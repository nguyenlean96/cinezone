import { useState, useRef, useEffect } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
const useInfiniteLoading = (props: any) => {
	const { availableItems, setIsLoading } = props;
	const [items, setItems] = useState<any[]>([]);
	const initialLoaded = useRef(false);
	const [hasMore, setHasMore] = useState(true);

	const loadItems = useDebouncedCallback(async (refresh = false) => {
		if (refresh) {
			await setItems([]);
		}

		return await new Promise((resolve: (value?: any) => void) => {
			/**
			 * Merge the current with the next 10 items as:
			 * [...prev, ...availableItems.splice(0, 10)]
			 */
			setItems((prev) => [...prev, ...availableItems.splice(0, 10)]);
			resolve();
		}).then(() => {
			setHasMore(availableItems.length > 0);
			setIsLoading(false);
		})
	}, 500);

	useEffect(() => {
		if (!initialLoaded.current && availableItems.length > 0) {
			loadItems();
			initialLoaded.current = true;
		}
	}, [availableItems, loadItems]);

	return { items, hasMore, loadItems };
};

export default useInfiniteLoading;