import express from 'express'
import {createClient} from '@supabase/supabase-js'
import bodyparse from 'body-parser'
const app = express()

const supabase = createClient(
    'https://wgucmeubdgeuplqttcpm.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndndWNtZXViZGdldXBscXR0Y3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1Njc3NDgsImV4cCI6MTk5MzE0Mzc0OH0.nsXQI0Dpv254LTqa-SVSfMkE1g7uhM6lStVgLm4dzvw'
);
app.use(bodyparse.json())
app.use(
    bodyparse.urlencoded({
        extended: true,
    })
)

export default async function search(req, res) {
    console.log("hi")
        const {data, error} = await supabase
            .from('bank_branches')
            .select()
.or(`branch.ilike.%${req.query.q.toLowerCase()}%,city.ilike.%${req.query.q.toLowerCase()}%,district.ilike.%${req.query.q.toLowerCase()}%,state.ilike.%${req.query.q.toLowerCase()}%`)
            .order('ifsc',{ascending:true})
.range(parseInt(req.query.offset),parseInt(req.query.offset)+parseInt(req.query.limit)-1)
res.send(data)
}
