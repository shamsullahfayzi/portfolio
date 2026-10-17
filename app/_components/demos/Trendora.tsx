"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  createSystem,
  defaultConfig,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import DemoFrame from "./DemoFrame";

// Chakra is scoped to this demo: its reset only applies under .trx, its tokens live on .trx, and it emits no global rules,
// so nothing here can restyle the rest of the page.
const system = createSystem({
  ...defaultConfig,
  globalCss: {},
  preflight: { scope: ":where(.trx)" },
  cssVarsRoot: ".trx",
  disableLayers: true,
});

type Kind = "shoe" | "pack" | "watch" | "phones" | "cap" | "bottle";
type Product = { id: number; name: string; cat: string; price: number; rating: number; kind: Kind; from: string; to: string };

// Invented catalogue.
const PRODUCTS: Product[] = [
  { id: 1, name: "Trail Runner", cat: "Shoes", price: 68, rating: 4.6, kind: "shoe", from: "#fed7aa", to: "#fb923c" },
  { id: 2, name: "Day Pack", cat: "Bags", price: 42, rating: 4.4, kind: "pack", from: "#bfdbfe", to: "#60a5fa" },
  { id: 3, name: "Field Watch", cat: "Watches", price: 120, rating: 4.8, kind: "watch", from: "#bbf7d0", to: "#4ade80" },
  { id: 4, name: "Studio Headphones", cat: "Audio", price: 89, rating: 4.5, kind: "phones", from: "#e9d5ff", to: "#a78bfa" },
  { id: 5, name: "Canvas Cap", cat: "Hats", price: 18, rating: 4.2, kind: "cap", from: "#fecdd3", to: "#fb7185" },
  { id: 6, name: "Steel Bottle", cat: "Outdoor", price: 24, rating: 4.7, kind: "bottle", from: "#a5f3fc", to: "#22d3ee" },
  { id: 7, name: "Court Sneaker", cat: "Shoes", price: 74, rating: 4.3, kind: "shoe", from: "#fde68a", to: "#fbbf24" },
  { id: 8, name: "Weekender", cat: "Bags", price: 96, rating: 4.6, kind: "pack", from: "#c7d2fe", to: "#818cf8" },
];
const CATS = ["All", "Shoes", "Bags", "Watches", "Audio"];
const FREE_SHIPPING = 100;
const SHIPPING = 6;
const money = (n: number) => `$${n.toFixed(2)}`;

function Art({ kind, from, to }: { kind: Kind; from: string; to: string }) {
  const id = `g-${kind}-${from.slice(1)}`;
  return (
    <svg viewBox="0 0 120 90" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="120" height="90" fill={`url(#${id})`} />
      <g fill="#fff" fillOpacity=".92" stroke="#0f172a" strokeOpacity=".55" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        {kind === "shoe" && <path d="M26 58 C30 46 36 40 44 36 L52 44 C60 46 70 46 78 50 C88 52 96 56 96 62 L96 66 L26 66 Z" />}
        {kind === "pack" && (
          <>
            <path d="M44 34 C44 24 76 24 76 34" fill="none" />
            <rect x="34" y="34" width="52" height="38" rx="9" />
            <rect x="46" y="50" width="28" height="14" rx="4" fillOpacity=".5" />
          </>
        )}
        {kind === "watch" && (
          <>
            <rect x="50" y="14" width="20" height="62" rx="6" fillOpacity=".6" />
            <circle cx="60" cy="45" r="21" />
            <path d="M60 45 L60 33 M60 45 L69 50" fill="none" />
          </>
        )}
        {kind === "phones" && (
          <>
            <path d="M34 54 C34 26 86 26 86 54" fill="none" strokeWidth="5" />
            <rect x="28" y="50" width="14" height="24" rx="6" />
            <rect x="78" y="50" width="14" height="24" rx="6" />
          </>
        )}
        {kind === "cap" && (
          <>
            <path d="M34 56 C34 32 80 30 84 54 Z" />
            <path d="M82 54 C96 54 102 58 102 62 L58 62 Z" />
          </>
        )}
        {kind === "bottle" && (
          <>
            <rect x="52" y="14" width="16" height="9" rx="3" />
            <rect x="46" y="22" width="28" height="56" rx="10" />
            <path d="M46 44 H74" fill="none" />
          </>
        )}
      </g>
    </svg>
  );
}

const Icon = ({ children, size = 18 }: { children: ReactNode; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);
const CartIcon = () => (
  <Icon>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" />
  </Icon>
);
const SearchIcon = () => (
  <Icon size={16}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
const Star = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

type Page = "home" | "cart";

export default function Trendora() {
  const [page, setPage] = useState<Page>("home");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 4: 1 });
  const [placed, setPlaced] = useState(false);

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const lines = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ p, qty: cart[p.id] }));
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING;

  const shown = useMemo(
    () => PRODUCTS.filter((p) => (cat === "All" || p.cat === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase())),
    [q, cat],
  );

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const step = (id: number, d: number) =>
    setCart((c) => {
      const n = (c[id] ?? 0) + d;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  return (
    <DemoFrame label="Trendora · store home and cart" note="Chakra UI · invented products" open>
      <ChakraProvider value={system}>
        <Box
          className="trx light"
          colorPalette="teal"
          bg="white"
          color="gray.900"
          fontFamily="inherit"
          borderWidth="1px"
          borderColor="gray.200"
          overflow="hidden"
        >
          {/* header */}
          <Flex align="center" gap="3" px="4" py="3" borderBottomWidth="1px" borderColor="gray.200" wrap="wrap">
            <Heading as="p" size="md" letterSpacing="-0.03em" color="teal.700">
              trendora
            </Heading>
            <HStack gap="1" ms={{ base: 0, sm: 3 }}>
              {(["home", "cart"] as Page[]).map((pg) => (
                <Button key={pg} size="sm" variant={page === pg ? "subtle" : "ghost"} onClick={() => setPage(pg)} aria-pressed={page === pg}>
                  {pg === "home" ? "Shop" : "Cart"}
                  {pg === "cart" && count > 0 && (
                    <Badge colorPalette="orange" variant="solid" borderRadius="full" ms="1" aria-label={`${count} items`}>
                      {count}
                    </Badge>
                  )}
                </Button>
              ))}
            </HStack>
            <Box position="relative" ms="auto" w={{ base: "100%", sm: "200px" }} order={{ base: 3, sm: 0 }}>
              <Box position="absolute" insetStart="3" top="50%" transform="translateY(-50%)" color="gray.500" pointerEvents="none">
                <SearchIcon />
              </Box>
              <Input
                size="sm"
                ps="9"
                type="search"
                placeholder="Search products"
                aria-label="Search products"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage("home");
                }}
              />
            </Box>
          </Flex>

          {page === "home" ? (
            <Box p="4">
              <Flex bg="teal.50" borderRadius="lg" p="4" align="center" justify="space-between" gap="3" wrap="wrap" mb="4">
                <Box>
                  <Text fontWeight="700" fontSize="lg" color="teal.900">
                    Free shipping over {money(FREE_SHIPPING)}
                  </Text>
                  <Text fontSize="sm" color="teal.800">
                    Pick a few things and watch the cart fill up.
                  </Text>
                </Box>
                <Button size="sm" colorPalette="teal" onClick={() => setPage("cart")}>
                  View cart ({count})
                </Button>
              </Flex>

              <HStack gap="2" mb="4" wrap="wrap" role="group" aria-label="Filter by category">
                {CATS.map((c) => (
                  <Button
                    key={c}
                    size="xs"
                    borderRadius="full"
                    variant={cat === c ? "solid" : "outline"}
                    aria-pressed={cat === c}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </Button>
                ))}
              </HStack>

              <SimpleGrid minChildWidth="136px" gap="3" aria-live="polite">
                {shown.map((p) => (
                  <Box
                    key={p.id}
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="white"
                    display="flex"
                    flexDirection="column"
                  >
                    <Box h="92px">
                      <Art kind={p.kind} from={p.from} to={p.to} />
                    </Box>
                    <Stack gap="1" p="3" flex="1">
                      <Text fontSize="xs" color="gray.600">
                        {p.cat}
                      </Text>
                      <Text fontWeight="600" fontSize="sm" lineHeight="1.25">
                        {p.name}
                      </Text>
                      <HStack gap="1" color="gray.700" fontSize="xs">
                        <Star />
                        {p.rating.toFixed(1)}
                      </HStack>
                      <Flex mt="auto" pt="2" align="center" justify="space-between" gap="2">
                        <Text fontWeight="700">{money(p.price)}</Text>
                        <Button size="xs" colorPalette="teal" onClick={() => add(p.id)} aria-label={`Add ${p.name} to cart`}>
                          {cart[p.id] ? "In cart" : "Add"}
                        </Button>
                      </Flex>
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
              {shown.length === 0 && (
                <Text py="8" textAlign="center" color="gray.600">
                  Nothing matches that search.
                </Text>
              )}
            </Box>
          ) : placed ? (
            <Stack align="center" gap="2" p="10" textAlign="center">
              <Heading as="p" size="lg">
                Order placed
              </Heading>
              <Text color="gray.600">That was a demo, so nothing was charged or shipped.</Text>
              <Button
                mt="2"
                size="sm"
                colorPalette="teal"
                onClick={() => {
                  setCart({});
                  setPlaced(false);
                  setPage("home");
                }}
              >
                Back to the shop
              </Button>
            </Stack>
          ) : (
            <Box p="4">
              <Heading as="p" size="lg" mb="3">
                Your cart
              </Heading>
              {lines.length === 0 ? (
                <Stack align="center" gap="2" py="10" textAlign="center">
                  <Text color="gray.600">Your cart is empty.</Text>
                  <Button size="sm" colorPalette="teal" onClick={() => setPage("home")}>
                    Browse products
                  </Button>
                </Stack>
              ) : (
                <Flex gap="4" wrap="wrap" align="flex-start">
                  <Stack flex="1 1 100%" minW="0" gap="2" aria-live="polite">
                    {lines.map(({ p, qty }) => (
                      <Flex key={p.id} gap="3" align="center" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="2" pe="3">
                        <Box w="64px" h="52px" borderRadius="md" overflow="hidden" flexShrink={0}>
                          <Art kind={p.kind} from={p.from} to={p.to} />
                        </Box>
                        <Box flex="1" minW="0">
                          <Text fontWeight="600" fontSize="sm" truncate>
                            {p.name}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {money(p.price)} each
                          </Text>
                        </Box>
                        <HStack gap="1">
                          <IconButton size="2xs" variant="outline" aria-label={`Remove one ${p.name}`} onClick={() => step(p.id, -1)}>
                            <Icon size={14}>
                              <path d="M5 12h14" />
                            </Icon>
                          </IconButton>
                          <Text w="6" textAlign="center" fontWeight="600" fontSize="sm" aria-label={`Quantity ${qty}`}>
                            {qty}
                          </Text>
                          <IconButton size="2xs" variant="outline" aria-label={`Add one ${p.name}`} onClick={() => step(p.id, 1)}>
                            <Icon size={14}>
                              <path d="M12 5v14M5 12h14" />
                            </Icon>
                          </IconButton>
                        </HStack>
                        <Text w="16" textAlign="end" fontWeight="700" fontSize="sm">
                          {money(p.price * qty)}
                        </Text>
                        <IconButton
                          size="2xs"
                          variant="ghost"
                          colorPalette="red"
                          aria-label={`Remove ${p.name} from cart`}
                          onClick={() => step(p.id, -qty)}
                        >
                          <Icon size={15}>
                            <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
                          </Icon>
                        </IconButton>
                      </Flex>
                    ))}
                  </Stack>

                  <Box flex="1 1 100%" minW="0" borderWidth="1px" borderColor="gray.200" borderRadius="lg" p="4" bg="gray.50">
                    <Text fontWeight="700" mb="3">
                      Order summary
                    </Text>
                    <Stack gap="2" fontSize="sm">
                      <Flex justify="space-between">
                        <Text color="gray.700">Subtotal</Text>
                        <Text>{money(subtotal)}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text color="gray.700">Shipping</Text>
                        <Text>{shipping === 0 ? "Free" : money(shipping)}</Text>
                      </Flex>
                      <Flex justify="space-between" fontWeight="700" fontSize="md" pt="2" borderTopWidth="1px" borderColor="gray.200">
                        <Text>Total</Text>
                        <Text>{money(subtotal + shipping)}</Text>
                      </Flex>
                    </Stack>
                    <Box mt="4">
                      <Progress.Root value={Math.min(100, (subtotal / FREE_SHIPPING) * 100)} size="sm" colorPalette="teal">
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>
                      <Text mt="1" fontSize="xs" color="gray.700">
                        {subtotal >= FREE_SHIPPING ? "You get free shipping." : `${money(FREE_SHIPPING - subtotal)} more for free shipping.`}
                      </Text>
                    </Box>
                    <Button mt="4" w="100%" colorPalette="teal" onClick={() => setPlaced(true)}>
                      Checkout
                    </Button>
                  </Box>
                </Flex>
              )}
            </Box>
          )}
        </Box>
      </ChakraProvider>
    </DemoFrame>
  );
}
