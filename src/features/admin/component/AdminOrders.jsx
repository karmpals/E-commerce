import { useEffect, useState } from "react"
import { ITEMS_PER_PAGE } from "../../../app/constant"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [sort, setSort] = useState({});


    const handleEdit = (order) => {
        setEditableOrderId(order.id)
    }
    const handleShow = () => {

    }
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value }
        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId(-1)
    }
    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return "bg-purple-200 text-purple-600";
            case 'dispatched':
                return "bg-yellow-200 text-yellow-600";
            case 'delivered':
                return "bg-green-200 text-green-600";
            case 'cancelled':
                return "bg-red-200 text-red-600";
            default:
                return "bg-purple-200 text-purple-600";
        }
    }



    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order }
        setSort(sort);
        console.log(sort)
    }

    const handlePage = (page) => {
        setPage(page);
    }

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
    }, [dispatch, page, sort])

    return (

        <>
            {/* component */}
            <div className="overflow-x-auto">
                <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full ">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left cursor-pointer" onClick={(e) => handleSort({
                                            sort: 'id',
                                            order: sort?._order === 'asc' ? 'desc' : 'asc'
                                        })}>Order#{' '}{sort._sort === 'id' &&
                                            (sort._order === 'asc' ? (
                                                <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                            ) : (
                                                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                            ))} </th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-left">Qty</th>
                                        <th
                                            className="py-3 px-0 text-left cursor-pointer"
                                            onClick={(e) =>
                                                handleSort({
                                                    sort: 'totalAmount',
                                                    order: sort?._order === 'asc' ? 'desc' : 'asc',
                                                })
                                            }
                                        >
                                            Total Amount{' '}
                                            {sort._sort === 'totalAmount' &&
                                                (sort._order === 'asc' ? (
                                                    <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                                ))}
                                        </th>
                                        <th className="py-3 px-6 text-center">Payment Mode</th>
                                        <th className="py-3 px-6 text-center">Address</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map((order, index) => <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">

                                                </div>
                                                <span className="font-medium">{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.items.map(item => <div className="flex items-center">
                                                <span>{item.product.title}</span>
                                            </div>)}
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.items.map(item => <div className="flex items-center">
                                                <div className="mr-2">
                                                </div>
                                                <span>#{item.quantity}</span>
                                            </div>)}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                ${order.totalAmount}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                {order.paymentMethod}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div> <strong>{order.selectAddress.name}</strong></div>
                                            <div>{order.selectAddress.street}</div>
                                            <div>{order.selectAddress.city}</div>
                                            <div>{order.selectAddress.state}</div>
                                            <div>{order.selectAddress.pinCode}</div>
                                            <div>{order.selectAddress.phone}</div>

                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {order.id === editableOrderId ?
                                                <select onChange={e => handleUpdate(e, order)}>
                                                    <option value="">--select--</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select> :
                                                <span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs cursor-pointer`}>
                                                    {order.status}
                                                </span>}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                                    <EyeIcon onClick={e => handleShow(order)} className="w-5 h-5" />
                                                </div>
                                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                                    <PencilIcon onClick={e => handleEdit(order)} className="w-5 h-5" />

                                                </div>
                                            </div>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination page={page}
                    setPage={setPage}
                    handlePage={handlePage}
                    totalItems={totalOrders} />
            </div>
        </>


    )
}

export default AdminOrders
