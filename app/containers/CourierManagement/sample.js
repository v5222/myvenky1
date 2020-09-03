let query = `select  upper(a.consignor) as consignor , d.origin as location ,count(a.invoiceno) as  totalinvoiceno, b.status as DELIVERED,coalesce(c.status,'0') as UNDELIVERED, coalesce(e.intransit,'0') as intransit from react.cpfactcourierportal a left join (select  consignor,count(*) as origin 
    from (select distinct upper(consignor) as consignor,upper(origin) as origin 
                        from react.cpfactcourierportal
                        	where date::date between (case when '${filterdate}' = 'NA' then current_date else '${sdate}' end)
                        	   and (case when  '${filterdate}' = 'NA' then current_date - interval '7 days' else '${edate}' end)
                              )a group by consignor) d 
                               on upper(a.consignor) = upper(d.consignor)
                               left join 
                        (select  upper(consignor) as consignor,count(*) as status
                         from react.cpfactcourierportal
                         where upper(status) ='DELIVERED' and 
                         date::date between (case when '${filterdate}' = 'NA' then current_date else '${sdate}' end)
                         and (case when  '${filterdate}' = 'NA' then current_date - interval '7 days' else '${edate}' end)
                         group by upper(consignor))b 
                         on upper(a.consignor) =  upper(b.consignor)
                         left join 
                        (select  upper(consignor)as consignor,count(*) as status  
                         from react.cpfactcourierportal 
                         where upper(status) ='UNDELIVERED' 
                         and date::date between (case when '${filterdate}' = 'NA' then current_date else '${sdate}' end)
                         and (case when  '${filterdate}' = 'NA' then current_date - interval '7 days' else '${edate}' end)
                         group by upper(consignor))c 
                         on upper(a.consignor) = upper(c.consignor) 
                        left join 
                        (select upper(consignor)as consignor,count(*) as intransit 
                         from react.cpfactcourierportal where  status is null
                         and date::date between (case when '${filterdate}' = 'NA' then current_date else '${sdate}' end)
                         and (case when  '${filterdate}' = 'NA' then current_date - interval '7 days' else '${edate}' end)
                        group by upper(consignor)) e 
                        on upper(a.consignor) = upper(e.consignor) 
                        where a.date::date between (case when '${filterdate}' = 'NA' then current_date else '${sdate}' end)
                        and (case when  '${filterdate}' = 'NA' then current_date - interval '7 days' else '${edate}' end) 
                        group by upper(a.consignor),b.status,d.origin,c.status,d.origin,e.intransit
                         order by 1`;
