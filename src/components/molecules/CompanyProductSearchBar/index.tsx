'use client';

import {SearchIcon} from 'lucide-react';
import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import {Button} from '~components/ui/button';
import {Input} from '~components/ui/input';
import {SearchParams} from '~config/searchParams';
import {AppRoutes} from '~types/AppRoutes';

type CompanyProductSearchBarProps = {
    id: string;
};

const CompanyProductSearchBar = ({id}: CompanyProductSearchBarProps) => {
    const searchParams = useSearchParams();

    const search = searchParams.get(SearchParams.SearchQuery);

    const router = useRouter();
    const [searchValue, setSearchValue] = useState(search ? search : '');

    return (
        <div className="flex justify-between border-b border-black border-opacity-10 w-full max-w-[700px] overflow-hidden">
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
            <Button
                className="bg-mainBlue rounded-none"
                onClick={() => {
                    router.push(
                        `${AppRoutes.WEB_PRODUCTS}/?${SearchParams.SearchQuery}=${searchValue}&${SearchParams.CompanyID}=${id}`,
                    );
                }}
            >
                {'Szukaj'}
            </Button>
        </div>
    );
};

export default CompanyProductSearchBar;
