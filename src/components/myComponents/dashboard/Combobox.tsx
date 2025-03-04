"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import axios from "axios"
import { Input } from "@/components/ui/input"

type variants = "student" | "book"
const variants = {
    student: {
        api: `/api/students`,
    },
    book: {
        api: `/api/books`,
    }
}

type item = {
    id: string,
    name?: string,
    title?: string
}

export function Combobox({ variant, setId }: { variant: variants, setId: React.Dispatch<React.SetStateAction<string>> }) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [query, setQuery] = useState("")
    const [items, setItems] = useState<item[]>([])
    const [queryDebounce] = useDebounce(query, 300)

    useEffect(() => {
        const fetchData = async () => {
            const apiRoute = variants[variant].api

            const { data } = await axios.get(`${apiRoute}?query=${query}`)

            setItems(data)
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryDebounce])

    const handleSelect = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue)
        setOpen(false)
        setId(currentValue)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value
                        ? items.find((item) => item.id === value)?.name || items.find((item) => item.id === value)?.title
                        : `Select ${variant}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
                <Command>
                    <Input placeholder={`find ${variant}...`} value={query} onChange={(e) => setQuery(e.target.value)} className="ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0" />
                    <CommandList>
                        <CommandEmpty>No {variant} found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.name || item.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
