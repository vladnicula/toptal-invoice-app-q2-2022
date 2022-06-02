import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import { useEffect, useRef } from "react"
import { getInvoiceById, InvoiceByIdResponse, UserAPI } from "../../../src/api/base"
import { USER_TOKEN_KEY } from "../../../src/auth/AuthContext"

export default function InvoiceViewPage (props: { 
    foo: string, 
    print: boolean,
    innvoiceData: InvoiceByIdResponse['invoice'] 
}) {
    useEffect(() => {
        if ( props.print ) {
            window.print();
        }
    }, [props.print])

    return (
        <div>
            <div className="nav">Pretend Nav</div>
            <pre>
                {JSON.stringify(props.innvoiceData, null, 2)}
            </pre>
            <style jsx global>{`
                @media print {
                    .nav {
                        display: none
                    }
                }
            `}</style>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps= async (context) => {

    // // todo import the token key
    const userToken = getCookie(USER_TOKEN_KEY, {req: context.req, res: context.res})

    // not logged in
    if ( !userToken ) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    } 

    let invalidToken = false;

    UserAPI.initApiToken(userToken.toString(), () => {
        invalidToken = true;
    })

    const id = context.query.id ? Array.isArray(context.query.id) ? context.query.id[0] : context.query.id : null
    const print = context.query.print ? Array.isArray(context.query.print) ? context.query.print[0] : context.query.print : false
    if ( !id ) {
        // 404 ?? 
    }
    const innvoiceData = await getInvoiceById(id!)

    if ( invalidToken ) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: {
            foo: "bar",
            id,
            print,
            innvoiceData
        } // will be passed to the page component as props
    }
}
