import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

function AppliedJobTable() {
    return (
        <div className='bg-gradient-to-r to-gray-200 from-red-100 rounded-md'>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [0,1,2].length <= 0 ? <span>You haven't applied any job yet.</span> : [0,1,2].map((appliedJob) => (
                            <TableRow >
                                <TableCell>time </TableCell>
                                <TableCell>title</TableCell>
                                <TableCell>name</TableCell>
                                {/* <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell> */}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
