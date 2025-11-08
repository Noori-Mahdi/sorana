import { twMerge } from 'tailwind-merge'
import React, { useState } from 'react'

export type TTableProps<T extends Record<string, any>> = {
  headers: string[]
  data: T[]
  info?: any[] // اختیاری و پیش‌فرض در نظر گرفته می‌شود
  className?: string
}

export const Table = <T extends Record<string, any>>({
  headers,
  data,
  info = [],
  className,
}: TTableProps<T>) => {
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    setExpandedRowIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div
      className={twMerge(
        'border-primary-700 bg-bg-primary overflow-x-auto rounded-lg border shadow-sm',
        className
      )}
    >
      <table className="min-w-full border-collapse  text-sm">
        <thead className="bg-bg-primary border-primary-700">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 text-right font-semibold whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y bg-primary-800">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="py-4 text-center text-gray-500"
              >
                داده‌ای یافت نشد
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const isExpanded = expandedRowIndex === rowIndex

              return (
                <React.Fragment key={rowIndex}>
                  <tr
                    className="cursor-pointer hover:bg-primary-950"
                    onClick={() => toggleRow(rowIndex)}
                  >
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="max-w-[220px] truncate px-4 py-2 whitespace-nowrap"
                        title={cell != null ? String(cell) : ''}
                      >
                        {cell ?? '-'}
                      </td>
                    ))}
                  </tr>

                  {/* ردیف جزئیات قابل گسترش */}
                  {isExpanded && (
                    <tr className="bg-gray-50">
                      <td colSpan={headers.length} className="px-4 py-3">
                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                          {info[rowIndex]?.products?.length > 0 ? (
                            info[rowIndex].products.map((p: any) => (
                              <div
                                key={p.id}
                                className="flex flex-wrap justify-between gap-2 border-b border-gray-200 px-2 py-1"
                              >
                                <span className="min-w-[120px] flex-1">
                                  محصول: {p.product.name}
                                </span>
                                <span className="min-w-[80px] flex-1">
                                  تعداد: {p.quantity}
                                </span>
                                <span className="min-w-[120px] flex-1">
                                  قیمت واحد:{' '}
                                  {p.price?.toLocaleString?.() ?? p.price} تومان
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-600">
                              جزئیاتی برای نمایش وجود ندارد.
                            </div>
                          )}

                          <div className="mt-2 flex flex-wrap gap-4 text-gray-600">
                            <span>
                              کاربر: {info[rowIndex]?.user?.userName ?? '-'}
                            </span>
                            <span>
                              ایمیل: {info[rowIndex]?.user?.email ?? '-'}
                            </span>
                            <span>
                              تلفن: {info[rowIndex]?.user?.userPhone ?? '-'}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
