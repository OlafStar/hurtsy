'use client';

import {SearchIcon} from 'lucide-react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';
import {Button} from '~components/ui/button';
import {Input} from '~components/ui/input';
import {SearchParams} from '~config/searchParams';

enum SearchSelect {
    Products = 'products',
    Companies = 'companies',
}

const SearchBar = () => {
    const searchParams = useSearchParams();

    const search = searchParams.get(SearchParams.SearchQuery);

    const router = useRouter();
    const [currentSearch, setCurrentSearch] = useState(SearchSelect.Products);
    const [searchValue, setSearchValue] = useState(search ? search : '');

    return (
        <div className="flex justify-between border border-black border-opacity-10 w-full max-w-[700px] rounded-xl overflow-hidden">
            <div className="w-full flex items-center pl-4">
                <SearchIcon className="w-4 mr-0 opacity-40" />
                <Input
                    defaultValue={searchValue.length ? searchValue : undefined}
                    placeholder="Search"
                    className="p-none outline-none border-none shadow-none focus-visible:ring-0"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </div>
            <div className="flex rounded-none border-l border-opacity-10 border-l-black">
                <Select
                    defaultValue={SearchSelect.Products}
                    onValueChange={(e) => {
                        setCurrentSearch(e as SearchSelect);
                    }}
                >
                    <SelectTrigger className="w-[102px] text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={SearchSelect.Products}>
                            {SearchSelect.Products}
                        </SelectItem>
                        <SelectItem value={SearchSelect.Companies}>
                            {SearchSelect.Companies}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    className="bg-mainBlue rounded-none"
                    onClick={() => {
                        router.push(
                            `/${currentSearch}/?${SearchParams.SearchQuery}=${searchValue}`,
                        );
                    }}
                >
                    {'Szukaj'}
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;
