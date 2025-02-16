import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const ProjectsCard = () => {
  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            {/* <DollarSign className="size-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
    </Card>
  )
}

export default ProjectsCard
