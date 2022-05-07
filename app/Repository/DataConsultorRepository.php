<?php
namespace App\Repository;


use Illuminate\Support\Facades\DB;

class DataConsultorRepository{

    public function get_usuarios()
    {
       $users = DB::table('cao_usuario')
        ->join('permissao_sistema','permissao_sistema.co_usuario','=','cao_usuario.co_usuario')
        ->where('permissao_sistema.co_sistema','=','1')
        ->where('permissao_sistema.in_ativo', '=','S')
        ->where('permissao_sistema.co_tipo_usuario', '<',3)
        ->select('cao_usuario.co_usuario','cao_usuario.no_usuario')
        ->get();
        return $users;
    }
    public function get_clientes()
    {
       $c = DB::table('cao_cliente')
        ->select('cao_cliente.co_usuario',"cao_cliente.no_usuario")
        ->get();
        return response()->json($c);
    }


    public function ranges(){
        $data = DB::table("cao_fatura")
        ->selectRaw("MIN(EXTRACT(YEAR FROM cao_fatura.data_emissao)) as min_date,MAX(EXTRACT(YEAR FROM cao_fatura.data_emissao)) as max_date")
        ->get();
        return $data;
    }
    public function data_bar($usuarios,$startDate, $endDate){
        $usuarios = request()->toArray();
        $data =  DB::table("cao_fatura")
        ->join("cao_os", "cao_fatura.co_os",'=',"cao_os.co_os")
        ->join("cao_usuario","cao_os.co_usuario","=","cao_usuario.co_usuario")
        ->whereIn("cao_usuario.co_usuario",$usuarios)
        ->leftJoin("cao_salario","cao_salario.co_usuario","=","cao_usuario.co_usuario")
        ->groupByRaw("EXTRACT(YEAR_MONTH FROM cao_fatura.data_emissao), cao_usuario.co_usuario")
        ->having("fecha",">=",$startDate)
        ->having("fecha","<=",$endDate)
        ->selectRaw('SUM(valor - valor * (total_imp_inc/100)) as receita_liquida,
        max(cao_salario.brut_salario) as salario,
        EXTRACT(YEAR_MONTH FROM cao_fatura.data_emissao) as fecha, cao_usuario.co_usuario as usuario')
        ->orderBy("fecha")
        ->get();
        return $data;
    }

    
    public function data_pizza($usuarios,$startDate, $endDate){
        $data =  DB::table("cao_fatura")
        ->join("cao_os", "cao_fatura.co_os",'=',"cao_os.co_os")
        ->join("cao_usuario","cao_os.co_usuario","=","cao_usuario.co_usuario")
        ->whereIn("cao_usuario.co_usuario",$usuarios)
        ->groupByRaw("cao_usuario.co_usuario")
        ->whereRaw("EXTRACT(YEAR_MONTH FROM cao_fatura.data_emissao) >= \"$startDate\"")
        ->whereRaw("EXTRACT(YEAR_MONTH FROM cao_fatura.data_emissao)<=\"$endDate\"")
        ->selectRaw('SUM(valor - valor * (total_imp_inc/100)) as receita_liquida, cao_usuario.co_usuario as usuario, cao_usuario.no_usuario as nombre')
        ->get();
        return $data;
    }

    public function data_all($user, $startDate, $endDate){
        $data =  DB::table("cao_fatura")
        ->join("cao_os", "cao_fatura.co_os",'=',"cao_os.co_os")
        ->join("cao_usuario","cao_os.co_usuario","=","cao_usuario.co_usuario")
        ->where("cao_usuario.co_usuario","=",$user)
        ->leftJoin("cao_salario","cao_salario.co_usuario","=","cao_usuario.co_usuario")
        ->groupByRaw("EXTRACT(YEAR_MONTH FROM cao_fatura.data_emissao), cao_usuario.co_usuario")
        ->having("fecha",">=",$startDate)
        ->having("fecha","<=",$endDate)
        ->selectRaw('SUM(valor - valor * (total_imp_inc/100)) as receita_liquida,
        sum((valor - valor * (total_imp_inc/100)) * (comissao_cn/100)) as comissao,
        cao_usuario.co_usuario as usuario,
        max(cao_salario.brut_salario) as salario,
        EXTRACT(YEAR_MONTH FROM cao_fatura.data_emissao) as fecha')
        ->orderBy("fecha")
        ->get();
        return $data;
    }



}