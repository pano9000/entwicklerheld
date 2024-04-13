<?php

namespace App\Http\Controllers;

use App\Category;
use App\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TrainingController extends Controller
{

    public function create(Request $request)
    {

        $validation = Validator::make($request->all(), 
            [
                "name" => ["required"],
                "category" => ["required", "exists:categories,name"],
                "distance" => ["required"],                
            ],
            [
                "category.exists" => "category not exists",
            ]
        );

        if ($validation->fails())
        {
            $error_fields = [];
            foreach ($validation->errors()->getMessages() as $field => $value) {
                array_push($error_fields, ["message" => $value[0]]);
            }
            $errorData = ["error" => $error_fields[0]];
            return response()->json($errorData, 422);
        }

        $requestContent = $request->json()->all();

        $training = new Training();
        $categoryId = Category::select("id")->where("name", $requestContent["category"])->first();

        $training["name"] = $requestContent["name"];
        $training["distance"] = $requestContent["distance"];
        $training["user_id"] = $request->user()->id;
        $training["category_id"] = $categoryId->id;


        $training->save();
        return response(null, 201);

    }

    public function index(Request $request)
    {

        $trainings = Training::all()
                              ->where("user_id", $request->user()->id)
                              ->where("category.name", "Running");

        $returnData = json_encode($trainings);

        return response($returnData, 200);

    }
}
