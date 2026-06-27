export default function TableSkeleton({theads}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border bg-cream">
                        {theads.map((h) => (
                            <th
                                key={h}
                                className="text-left px-5 py-3.5 text-xs font-semibold text-ash uppercase tracking-wider"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-border bg-white">
                    {[...Array(3)].map((_, i) => (
                        <tr key={i}>
                            {/* Recipient */}
                            <td className="px-5 py-4">
                                <div className="h-4 w-20 rounded bg-cream animate-pulse" />
                            </td>

                            {/* Location */}
                            <td className="px-5 py-4">
                                <div className="h-4 w-32 rounded bg-cream animate-pulse" />
                            </td>

                            {/* Blood */}
                            <td className="px-5 py-4">
                                <div className="h-7 w-14 rounded-lg bg-cream animate-pulse" />
                            </td>

                            {/* Date */}
                            <td className="px-5 py-4">
                                <div className="h-4 w-36 rounded bg-cream animate-pulse" />
                            </td>

                            {/* Status */}
                            <td className="px-5 py-4">
                                <div className="h-7 w-20 rounded-full bg-cream animate-pulse" />
                            </td>

                            {/* Actions */}
                            <td className="px-5 py-4">
                                <div className="h-8 w-8 rounded-lg bg-cream animate-pulse" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}