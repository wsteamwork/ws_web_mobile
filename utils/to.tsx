import Link, { LinkProps } from 'next/link';

const to = (to:LinkProps) => ({ to, component: Link as any });

export default to;
