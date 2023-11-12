'use client';

import {SearchIcon} from 'lucide-react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
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
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

enum SearchSelect {
    Products = 'products',
    Companies = 'companies',
}

const SearchBar = () => {
    const searchParams = useSearchParams();

    const search = searchParams.get(SearchParams.SearchQuery);

    const [currentSearch, setCurrentSearch] = useState(SearchSelect.Products);
    const [searchValue, setSearchValue] = useState(search ? search : '');

    return (
        <div className="flex justify-between border border-black border-opacity-10 w-full max-w-[700px] rounded-xl overflow-hidden">
            <div className="w-full flex items-center pl-4">
                <SearchIcon className="w-4 mr-0 opacity-40" />
                <Input
                    defaultValue={searchValue.length ? searchValue : undefined}
                    placeholder="Search"
                    className="p-none outline-none border-none shadow-none focus-visible:ring-0 placeholder:font-medium"
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
                    <SelectTrigger className="w-[102px] text-xs font-medium">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={SearchSelect.Products}>
                            {translateEnumValueToPolish(SearchSelect.Products)}
                        </SelectItem>
                        <SelectItem value={SearchSelect.Companies}>
                            {translateEnumValueToPolish(SearchSelect.Companies)}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Link
                    href={`/${currentSearch}/?${SearchParams.SearchQuery}=${searchValue}&${SearchParams.PagePagination}=1&${SearchParams.PageSize}=10`}
                >
                    <Button className="bg-mainBlue rounded-none">{'Szukaj'}</Button>
                </Link>
            </div>
        </div>
    );
};

export default SearchBar;
