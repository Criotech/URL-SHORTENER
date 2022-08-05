import React, { FC } from 'react';
import { IShortURL } from '../types';
import CopySVG from "../assests/images/copy.svg"

interface IProps {
    data: IShortURL[]
}

const TableComponent: FC<IProps> = ({ data }) => {
    const copyToClipBoard = async (text: string) => {
        await navigator.clipboard.writeText(`http://localhost:3200/${text}`);
        alert('copied')
    }

    function dateToYMD(dateString: string) {
        var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let date = new Date(dateString);
        var d = date.getDate();
        var m = strArray[date.getMonth()];
        var y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
    }

    return (
        <table>
            <caption>
                Recent URLs
            </caption>
            <thead>
                <tr>
                    <th scope="col">Original URL</th>
                    <th scope="col">Short URL</th>
                    <th scope="col">Date created</th>
                    <th scope="col"></th>
                    <th scope="col">Clicks</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.sort(
                        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
                      ).map((item) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.fullUrl}</td>
                                <td><a href={'http://localhost:3200/'+item.short}>{"http://localhost:3200/" + item.short}</a></td>
                                <td>{dateToYMD(item.createdAt)}</td>
                                <td>
                                    <button onClick={() => copyToClipBoard(item.short)}>
                                        <img src={CopySVG} alt="copy icon" />
                                        <span>Copy</span>
                                    </button>
                                </td>
                                <td>{item.clicks}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TableComponent;