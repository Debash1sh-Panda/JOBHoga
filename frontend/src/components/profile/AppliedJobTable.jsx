import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector } from 'react-redux';

function AppliedJobTable() {
    const { appliedJob } = useSelector((store) => store.application);
    return (
        <div className='bg-gradient-to-r to-gray-200 from-red-100 rounded-md'>
            <Table>
                <TableCaption className="mb-4">A list of your applied jobs</TableCaption>
                <TableHeader className="text-center">
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-left">
                    {
                        appliedJob.length <= 0 ? <span>You haven't applied any job yet.</span> : appliedJob.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.companyId?.companyName}</TableCell>
                                <TableCell className="text-right"><span className={`p-1 rounded-md font-semibold text-sm cursor-not-allowed ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</span></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
