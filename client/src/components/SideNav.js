import React from 'react'

import { Card, CardHeader, CardBody, Form, FormGroup, Button } from 'reactstrap'
import { useQuery, useMutation } from "@apollo/react-hooks"
import { DIECTOR_LIST, ADD_MOVIE, MOVIE_LIST, ADD_DIRECTOR } from "../queries/queries"
import { useForm } from 'react-hook-form';


const SideNav = () => {
    const { data } = useQuery(DIECTOR_LIST)
    const { register, handleSubmit } = useForm();
    const { register:registerDirector, handleSubmit:handleSubmitDirector } = useForm();
    const [addMovie] = useMutation(ADD_MOVIE, { refetchQueries: [{ query: MOVIE_LIST}],awaitRefetchQueries: true})
    const [addDirector] = useMutation(ADD_DIRECTOR, {refetchQueries: [{query: DIECTOR_LIST}], awaitRefetchQueries:true})
    const onSubmit = ({ movieName, movieGenre, directorId }, e) => {
        e.target.reset()
        addMovie({ variables: { name: movieName, genre: movieGenre, directorId } })
    };

    const onSubmitDirector = ({ directorName, directorAge },e) => {
        e.target.reset()
        // console.log(directorAge);
        const IntAge = parseInt(directorAge)
        addDirector({ variables: { name: directorName, age: IntAge } })
        // console.log({ variables: { name: directorName, age: IntAge } });
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    映画監督
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="text" name="directorName"
                                placeholder="監督名"
                                ref={registerDirector}
                            />
                        </FormGroup>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="number" name="directorAge"
                                placeholder="年齢"
                                ref={registerDirector}
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">追加</Button>
                    </Form>
                </CardBody>
            </Card>
            <Card className="mt-4">
                <CardHeader>
                    映画作品
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="text" name="movieName"
                                placeholder="タイトル"
                                ref={register}
                            />
                        </FormGroup>
                        <FormGroup>
                            <input
                                className="form-control"
                                type="text" name="movieGenre"
                                placeholder="ジャンル"
                                ref={register}
                            />
                        </FormGroup>
                        <FormGroup>
                            <select
                                className="form-control"
                                type="select"
                                name="directorId"
                                ref={register}
                            >
                                {
                                    data && data.directors.map(({ id, name }) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))
                                }
                                </select>
                        </FormGroup>
                        <Button color="primary" type="submit">追加</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default SideNav
